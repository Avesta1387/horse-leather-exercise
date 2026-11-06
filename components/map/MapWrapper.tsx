'use client';

import dynamic from "next/dynamic";




const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-42.5 flex items-center justify-center">
            Loading map...
        </div>
    )
})


export default Map;