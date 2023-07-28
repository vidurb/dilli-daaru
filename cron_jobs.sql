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
