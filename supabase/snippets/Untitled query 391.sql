SELECT
    current_setting('request.jwt.claims', true) AS jwt_claims,
    current_setting('request.jwt.claim.sub', true) AS jwt_sub,
    current_setting('request.jwt.claim.role', true) AS jwt_role;