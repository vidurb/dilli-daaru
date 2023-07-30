-- Drop old function (wrong name)
drop function if exists nearby_restaurants(float, float);
-- Create new function
create
    or replace function nearby_vendors(lat float, long float)
    returns setof record
    language sql
as $$
select id, address, st_distance(location, st_point(long, lat)::geography) as dist_meters
from public."Vendor"
order by location <-> st_point(long, lat)::geography;
$$;
