-- Drop old function (wrong name)
drop function if exists nearby_restaurants(float, float);
-- Create new function
CREATE VIEW Vendor_Plus as SELECT *, null::float as dist_meters FROM "Vendor" WHERE false;
create
    or replace function nearby_vendors(lat float, long float)
    returns TABLE(LIKE vendor_plus)
    language sql
as $$
select *, st_distance(location, st_point(long, lat)::geography) as dist_meters
from public."Vendor"
order by location <-> st_point(long, lat)::geography;
$$;
