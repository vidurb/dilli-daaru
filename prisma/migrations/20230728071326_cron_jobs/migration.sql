-- CRON jobs

select cron.schedule(
               'invoke-product-sync',
               '*/2 5-14 * * *',
               $$ select
      net.http_post(
          url:='https://dilli-daaru.vercel.app/api/sync/product'
      ) as request_id;
$$
);

select cron.schedule(
               'invoke-product-sync',
               '*/2 5-14 * * *',
               $$ select
      net.http_post(
          url:='https://dilli-daaru.vercel.app/api/sync/vendor'
      ) as request_id;
$$
);

create
or replace function nearby_restaurants(lat float, long float)
returns setof record
language sql
as $$
select id, st_astext(location) as location, st_distance(location, st_point(long, lat)::geography) as dist_meters
from public."Vendor"
order by location < - > st_point(long, lat)::geography;
$$;
