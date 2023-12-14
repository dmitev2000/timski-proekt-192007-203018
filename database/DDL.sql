-- SCHEMA: develop

-- DROP SCHEMA IF EXISTS develop;

CREATE SCHEMA IF NOT EXISTS develop
    AUTHORIZATION postgres;

CREATE TABLE develop.phone_brands (
	brand_id SERIAL NOT NULL PRIMARY KEY,
	brand_name VARCHAR(256) NOT NULL UNIQUE,
	brand_logo VARCHAR(100) NOT NULL UNIQUE,
	country VARCHAR(256) NOT NULL
);

CREATE TABLE develop.phones (
	phone_id SERIAL NOT NULL PRIMARY KEY,
	phone_name VARCHAR(300) NOT NULL UNIQUE,
	phone_img VARCHAR(100) NOT NULL UNIQUE,
	a_year INTEGER NOT NULL,
	network_spec VARCHAR(300) NOT NULL,
	body_dimensions VARCHAR(300) NOT NULL,
	body_weight VARCHAR(300) NOT NULL,
	body_sim VARCHAR(300) NOT NULL,
	display_type VARCHAR(300) NOT NULL,
	display_size VARCHAR(300) NOT NULL,
	display_resolution VARCHAR(300) NOT NULL,
	platform_os VARCHAR(300) NOT NULL,
	platform_chipset VARCHAR(300) NOT NULL,
	platform_cpu VARCHAR(200) NOT NULL,
	platform_gpu VARCHAR(200) NOT NULL,
	memory_card_slot BOOLEAN NOT NULL,
	memory_internal VARCHAR(100) NOT NULL,
	main_camera_type VARCHAR(30) NOT NULL,
	main_camera_spec VARCHAR(300) NOT NULL,
	main_camera_features VARCHAR(300),
	main_camera_video VARCHAR(300) NOT NULL,
	selfie_camera_type VARCHAR(30) NOT NULL,
	selfie_camera_spec VARCHAR(300) NOT NULL,
	selfie_camera_features VARCHAR(300),
	selfie_camera_video VARCHAR(300) NOT NULL,
	sound_loudspaeker BOOLEAN NOT NULL,
	sound_jack VARCHAR(100) NOT NULL,
	comms_wlan VARCHAR(100) NOT NULL,
	comms_bluetooth VARCHAR(100) NOT NULL,
	comms_positioning VARCHAR(100) NOT NULL,
	comms_nfc VARCHAR(100) NOT NULL,
	comms_radio VARCHAR(100) NOT NULL,
	comms_usb VARCHAR(100) NOT NULL,
	sensors VARCHAR(300) NOT NULL,
	battery_type VARCHAR(150) NOT NULL,
	battery_charging VARCHAR(100) NOT NULL,
	misc_models VARCHAR(300) NOT NULL
);

CREATE TABLE develop.phone_colors (
	phone_id INTEGER NOT NULL,
	color VARCHAR(30) NOT NULL,
	CONSTRAINT fk_phone_col FOREIGN KEY (phone_id) REFERENCES develop.phones(phone_id),
	CONSTRAINT pk_phone_color PRIMARY KEY (phone_id, color)
);

CREATE TABLE develop.tech_shops (
	shop_id SERIAL NOT NULL PRIMARY KEY,
	shop_name VARCHAR(256) NOT NULL UNIQUE,
	shop_logo VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE develop.produce (
	brand_id INTEGER NOT NULL,
	phone_id INTEGER NOT NULL,
	CONSTRAINT fk_brand FOREIGN KEY (brand_id) REFERENCES develop.phone_brands(brand_id),
	CONSTRAINT fk_phone FOREIGN KEY (phone_id) REFERENCES develop.phones(phone_id),
	CONSTRAINT pk_produce PRIMARY KEY (brand_id, phone_id)
);

CREATE TABLE develop.in_stock (
	shop_id INTEGER NOT NULL,
	phone_id INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	color VARCHAR(30) NOT NULL,
	CONSTRAINT fk_shop FOREIGN KEY (shop_id) REFERENCES develop.tech_shops(shop_id),
	CONSTRAINT fk_phone FOREIGN KEY (phone_id) REFERENCES develop.phones(phone_id),
	CONSTRAINT pk_stock PRIMARY KEY (shop_id, phone_id, color)
);

CREATE TABLE develop.roles (
	role_id SERIAL NOT NULL PRIMARY KEY,
	role_name VARCHAR(100) NOT NULL UNIQUE,
	rold_desc VARCHAR(255)
);

CREATE TABLE develop.users (
	user_id SERIAL NOT NULL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL UNIQUE,
	user_password VARCHAR(255) NOT NULL,
	role_id INTEGER NOT NULL,
	verified BOOLEAN,
	CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES develop.roles(role_id)
);

CREATE TABLE develop.carts (
	cart_id SERIAL NOT NULL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES develop.users(user_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE develop.products_in_carts (
	cart_id INTEGER NOT NULL,
	phone_id INTEGER NOT NULL,
	shop_id INTEGER NOT NULL,
	color VARCHAR(30) NOT NULL,
	quantity INTEGER NOT NULL CHECK (quantity > 0),
	CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES develop.carts(cart_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_phone FOREIGN KEY (phone_id) REFERENCES develop.phones(phone_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_shop FOREIGN KEY (shop_id) REFERENCES develop.tech_shops(shop_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT pk_pic PRIMARY KEY (cart_id, phone_id, shop_id, color) 
);

CREATE TABLE develop.works_for (
	user_id INTEGER NOT NULL,
	shop_id INTEGER NOT NULL,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES develop.users(user_id),
	CONSTRAINT fk_shop FOREIGN KEY (shop_id) REFERENCES develop.tech_shops(shop_id),
	CONSTRAINT pk_works PRIMARY KEY (user_id, shop_id)
);

CREATE TABLE develop.orders (
	order_id SERIAL NOT NULL PRIMARY KEY,
	order_date TIMESTAMP NOT NULL,
	user_id INTEGER NOT NULL,
	CONSTRAINT fk_o_user FOREIGN KEY (user_id) REFERENCES develop.users(user_id)
);

CREATE TABLE develop.products_in_orders (
	order_id INTEGER NOT NULL,
	phone_id INTEGER NOT NULL,
	shop_id INTEGER NOT NULL,
	color VARCHAR(30) NOT NULL,
	quantity INTEGER NOT NULL,
	CONSTRAINT fk_order_ FOREIGN KEY (order_id) REFERENCES develop.orders(order_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_phone_ FOREIGN KEY (phone_id) REFERENCES develop.phones(phone_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_shop_ FOREIGN KEY (shop_id) REFERENCES develop.tech_shops(shop_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT pk_prod_in_ord PRIMARY KEY (order_id, phone_id, shop_id, color)
);


create table develop.history_prices(
	hp_id serial not null primary key,
	phone_id integer not null,
	shop_id integer not null,
	price decimal not null,
	date_start date not null,
	date_end date,
	constraint fk_phone_id_hist foreign key (phone_id) references develop.phones(phone_id)
	on delete cascade on update cascade,
	constraint fk_shop_id_hist foreign key (shop_id) references develop.tech_shops(shop_id)
	on delete cascade on update cascade
)