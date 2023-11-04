SELECT ph.phone_id,
       ph.phone_name,
       ph.phone_img,
       ph.a_year,
       pb.brand_name,
       pb.brand_logo
FROM develop.phones ph
JOIN develop.produce pr ON ph.phone_id = pr.phone_id
JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id; -- Site telefoni


SELECT *
FROM develop.phones ph
JOIN develop.produce pr ON ph.phone_id = pr.phone_id
JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id
WHERE ph.phone_id = ${id}; -- Eden telefon spored ID-to


SELECT br.brand_id,
       br.brand_name,
       COUNT(pr.phone_id)::integer AS number_of_devices
FROM develop.phone_brands br
JOIN develop.produce pr ON br.brand_id = pr.brand_id
GROUP BY br.brand_id,
         br.brand_name
ORDER BY br.brand_name ASC; -- Koi tel. kompanii i kolku uredi imame od nivnite


SELECT DISTINCT ph.a_year
FROM develop.phones ph
ORDER BY ph.a_year ASC; -- Od koi godini se telefonite


SELECT ph.phone_id,
       ph.phone_name,
       ts.shop_id,
       ts.shop_name,
       ts.shop_logo,
       se.price,
       st.quantity
FROM develop.phones ph
JOIN develop.sell se ON ph.phone_id = se.phone_id
JOIN develop.tech_shops ts ON ts.shop_id = se.shop_id
JOIN develop.in_stock st ON (ph.phone_id = st.phone_id
                             AND ts.shop_id = st.shop_id)
WHERE ph.phone_id = ${id}
ORDER BY se.price ASC; -- Dostapnost i ceni na daden ured


SELECT role_id
FROM develop.roles r
WHERE r.role_name = $1; -- role_id