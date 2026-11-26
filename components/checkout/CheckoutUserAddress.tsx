'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { Dispatch, SetStateAction, useEffect } from "react";

type Province = {
    id: number,
    title: string
};

type City = {
    id: number,
    title: string,
    province_id: number
}

type Props = {
    provinces: Province[] | null,
    cities: City[] | null,
    address: string | null,
    postalCode: string | null,
    selectedProvince: Province | null,
    selectedCity: City | null,
    plate: string | null,
    unit: string | null,

    setProvinces: Dispatch<SetStateAction<Province[] | null>>,
    setCities: Dispatch<SetStateAction<City[] | null>>,
    setAddress: Dispatch<SetStateAction<string | null>>,
    setPostalCode: Dispatch<SetStateAction<string | null>>,
    setSelectedProvince: Dispatch<SetStateAction<Province | null>>,
    setSelectedCity: Dispatch<SetStateAction<City | null>>,
    setPlate: Dispatch<SetStateAction<string | null>>,
    setUnit: Dispatch<SetStateAction<string | null>>
}

export default function CheckoutUserAddress({
    provinces,
    cities,
    address,
    postalCode,
    selectedProvince,
    selectedCity,
    plate,
    unit,
    setProvinces,
    setCities,
    setAddress,
    setPostalCode,
    setSelectedProvince,
    setSelectedCity,
    setPlate,
    setUnit
}: Props) {

    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        const getProvinces = async () => {
            const { data, error } = await supabase
                .from('provinces')
                .select('*');

            if (error) {
                console.error(error);
                return;
            }

            setProvinces(data);
        };

        getProvinces();
    }, []);

    useEffect(() => {
        let cancelled = false;

        if (!selectedProvince) {
            setCities(null);
            return;
        }

        const getCities = async () => {
            setCities(null);

            const { data, error } = await supabase
                .from('cities')
                .select('*')
                .eq('province_id', selectedProvince.id);

            if (cancelled) return;

            if (error) {
                console.error(error);
                setCities(null);
                return;
            }

            setCities(data);
        };

        getCities();

        return () => {
            cancelled = true;
        };
    }, [selectedProvince]);

    return (
        <div className="">
            <div className="flex flex-col gap-2">
                <label htmlFor="provinces" className="" >استان</label>
                <select value={selectedProvince?.id ?? ''}
                    name="priovinces" id="provinces"
                    onChange={(e) => {
                        const province = provinces?.find(
                            (item) => item.id === Number(e.target.value)
                        )

                        setSelectedProvince(province ?? null);
                        setSelectedCity(null)
                    }}
                    className="outline-0 p-4 border border-primary-20 rounded-[10px]"
                >
                    {provinces?.map((province) => (
                        <option value={province.id} key={province.id} className="">
                            {province.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="cities" className="" >شهر</label>
                <select disabled={!selectedProvince || !cities?.length} value={selectedCity?.id ?? ''}
                    name="cities" id="cities"
                    onChange={(e) => {
                        const city = cities?.find(
                            (item) => item.id === Number(e.target.value)
                        )

                        setSelectedCity(city ?? null)
                    }}
                    className="outline-0 p-4 border border-primary-20 rounded-[10px]"
                >
                    {cities?.map((city) => (
                        <option value={city.id} key={city.id} className="">
                            {city.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4 flex flex-col">
                <label htmlFor="address" className="flex mb-2 text-sm font-light ">آدرس</label>
                <input value={address ?? ''} onChange={(e) => setAddress(e.target.value)} placeholder={address ? address : 'آدرس'} id="address" type="text" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] " />
            </div>
            <div className="mt-4 flex flex-col">
                <label htmlFor="postal-code" className="flex mb-2 text-sm font-light ">کد پستی</label>
                <input value={postalCode ?? ''} onChange={(e) => setPostalCode(e.target.value)} placeholder={postalCode ? postalCode : 'کد پستی'} id="postal-code" type="text" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] " />
            </div>
            <div className="flex items-center gap-4">
                <div className="mt-4 flex flex-col">
                    <label htmlFor="plate" className="flex mb-2 text-sm font-light ">پلاک</label>
                    <input value={plate ?? ''} onChange={(e) => setPlate(e.target.value)} placeholder={plate ? plate : 'پلاک'} id="plate" type="number" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] " />
                </div>
                <div className="mt-4 flex flex-col">
                    <label htmlFor="unit" className="flex mb-2 text-sm font-light ">واحد</label>
                    <input value={unit ?? ''} onChange={(e) => setUnit(e.target.value)} placeholder={unit ? unit : 'واحد'} id="unit" type="number" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] " />
                </div>
            </div>
        </div>
    )
};
