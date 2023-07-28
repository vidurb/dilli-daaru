create
or replace function nearby_restaurants(lat float, long float)
returns setof record
language sql
as $$
select id, st_astext(location) as location, st_distance(location, st_point(long, lat)::geography) as dist_meters
from public."Vendor"
order by location <-> st_point(long, lat)::geography;
$$;
