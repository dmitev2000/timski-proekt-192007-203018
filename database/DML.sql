insert into develop.phone_brands (brand_id, brand_name, brand_logo, country) values
(default, 'Xiaomi', 'xiaomi-logo.png', 'China'),
(default, 'Apple', 'apple-logo.png', 'USA'),
(default, 'Samsung', 'samsung-logo.png', 'Republic of Korea'),
(default, 'LG', 'lg-logo.png', 'South Korea'),
(default, 'Nokia', 'nokia-logo.png', 'Finland'),
(default, 'Huawei', 'huawei-logo.png', 'China'),
(default, 'Honor', 'honor-logo.png', 'China'),
(default, 'Lenovo', 'lenovo-logo.png', 'China'),
(default, 'Sony', 'sony-logo.png', 'Japan')

insert into develop.phones (phone_id, phone_name, phone_img, a_year, network_spec, body_dimensions, 
body_weight, body_sim, display_type, display_size, display_resolution, platform_os,
platform_chipset, platform_cpu, platform_gpu, memory_card_slot, memory_internal, main_camera_type,
main_camera_spec, main_camera_features, main_camera_video, selfie_camera_type, selfie_camera_spec,
selfie_camera_features, selfie_camera_video, sound_loudspaeker, sound_jack, comms_wlan, comms_bluetooth,
comms_positioning, comms_nfc, comms_radio, comms_usb, sensors, battery_type, battery_charging,
) values
(default, 'Poco F5', 'poco-f5.png', 2023, 'GSM / HSPA / LTE / 5G', '161.1 x 75 x 7.9 mm (6.34 x 2.95 x 0.31 in)',
'181 g (6.38 oz)', 'Dual SIM (Nano-SIM, dual stand-by)', 'AMOLED, 68B colors, Dolby Vision, HDR10+, 120Hz, 500 nits (typ), 1000 nits (peak)',
'6.67 inches, 107.4 cm2 (~88.9% screen-to-body ratio)', '1080 x 2400 pixels, 20:9 ratio (~395 ppi density)',
'Android 13, MIUI 14 for POCO', 'Qualcomm SM7475-AB Snapdragon 7+ Gen 2 (4 nm)',
'Octa-core (1x2.91 GHz Cortex-X2 & 3x2.49 GHz Cortex-A710 & 4x1.8 GHz Cortex-A510)',
'Adreno 725', false, '256GB 8GB RAM', 'triple', 
'64 MP, f/1.8, (wide), 1/2", 0.7µm, PDAF, OIS 8 MP, f/2.2, 120˚ (ultrawide), 1/4", 1.12µm 2 MP, f/2.4, (macro)',
'LED flash, HDR, panorama', '4K@30fps, 1080p@30/60/120fps, gyro-EIS', 'single', '16 MP, f/2.5, (wide)',
null, '1080p@30/60fps', true, '24-bit/192kHz audio', 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band',
'5.3, A2DP, LE', 'GPS (L1), GLONASS (G1), BDS (B1I), GALILEO (E1), QZSS (L1)', 
'Yes (market/region dependent)', 'No', 'USB Type-C 2.0, OTG', 'Fingerprint (side-mounted), accelerometer, gyro, proximity, compass',
'Li-Po 5000 mAh, non-removable', '67W wired, PD3, QC4, 100% in 46 min (advertised)'
),
(default, '12T PRO', '12t-pro.png', 2022, 'GSM / HSPA / LTE / 5G', '163.1 x 75.9 x 8.6 mm (6.42 x 2.99 x 0.34 in)',
'205g (7.23oz)', 'Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)', 
'AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+, 500 nits (typ), 900 nits (peak)',
'6.67 inches, 107.4 cm2 (~86.7% screen-to-body ratio)', '1220 x 2712 pixels, 20:9 ratio (~446 ppi density)',
'Android 12, MIUI 13', 'Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)', 
'Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x2.0 GHz Cortex-A510)',
'Adreno 730', false, '256GB 12GB RAM', 'triple', '200 MP, f/1.7, (wide), 1/1.22", 0.64µm, PDAF, OIS', 'Dual-LED dual-tone flash, HDR, panorama',
'8K@24fps, 4K@30/60fps, 1080p@30/60/120/240fps, HDR10+', 'single', '20 MP, f/2.2, (wide), 1/3.47", 0.8µm', 'HDR, panorama',
'1080p@30/60fps, HDR', true, 'No', 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct', '5.2, A2DP, LE, aptX HD',
'GPS (L1+L5), GLONASS (L1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5), NavIC (L5)', 'Yes (market/region dependent)',
'No', 'USB Type-C 2.0, OTG', 'Fingerprint (under display, optical), accelerometer, gyro, proximity, compass, color spectrum',
'Li-Po 5000 mAh, non-removable', '120W wired, 100% in 19 min (advertised)'
),
(default, 'Galaxy M34 5G', 'galaxy-m34-5g.png', 2023, 'GSM / HSPA / LTE / 5G', '161.7 x 77.2 x 8.8 mm (6.37 x 3.04 x 0.35 in)',
'208g (7.34oz)', 'Hybrid Dual SIM (Nano-SIM, dual stand-by)', 'Super AMOLED, 120Hz, 1000 nits (peak)', 
'6.5 inches, 103.7 cm2 (~83.1% screen-to-body ratio)', '1080 x 2340 pixels, 19.5:9 ratio (~396 ppi density)',
'Android 13, One UI 5.1', 'Exynos 1280 (5 nm)', 'Octa-core (2x2.4 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55)', 'Mali-G68',
true, '128GB 8GB RAM', 'triple', '50 MP, f/1.8, (wide), PDAF, OIS', 'LED flash, panorama, HDR', '4K@30fps, 1080p@30fps',
'single', '13 MP, f/2.2, (wide)', null, '1080p@30fps', true, 'Yes', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct',
'5.3, A2DP, LE', 'GPS, GLONASS, GALILEO, BDS', 'Yes', 'Unspecified', 'USB Type-C 2.0, OTG', 
'Fingerprint (side-mounted), accelerometer, gyro, compass Virtual proximity sensing', 'Li-Po 6000 mAh, non-removable',
'25W wired',
),
(default, 'iPhone 13 Pro Max', 'iphone-13-pro-max.png', 2021, 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
'160.8 x 78.1 x 7.7 mm (6.33 x 3.07 x 0.30 in)', '240 g (8.47 oz)', 'Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)',
'Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (HBM), 1200 nits (peak)', '6.7 inches, 109.8 cm2 (~87.4% screen-to-body ratio)',
'1284 x 2778 pixels, 19.5:9 ratio (~458 ppi density)', 'iOS 15, upgradable to iOS 16.5, planned upgrade to iOS 17',
'Apple A15 Bionic (5 nm)', 'Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)', 'Apple GPU (5-core graphics)',
false, '1TB 6GB RAM NVMe', 'triple', 
'12 MP, f/1.5, 26mm (wide), 1/1.7", 1.9µm, dual pixel PDAF, sensor-shift OIS; 12 MP, f/2.8, 77mm (telephoto), PDAF, 1/3.5", OIS, 3x optical zoom; 12 MP, f/1.8, 13mm, 120˚ (ultrawide), 1/3.5", PDAF',
'Dual-LED dual-tone flash, HDR (photo/panorama)', '4K@24/30/60fps, 1080p@30/60/120/240fps', 'single',
'12 MP, f/2.2, 23mm (wide), 1/3.6"', 'HDR', '4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS', true,
'No', 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot', '5.0, A2DP, LE', 'GPS, GLONASS, GALILEO, BDS, QZSS', 'Yes', 'No',
'Lightning, USB 2.0', 'Face ID, accelerometer, gyro, proximity, compass, barometer Ultra Wideband (UWB) support',
'Li-Ion 4352 mAh, non-removable (16.75 Wh)', 'Wired, PD2.0, 50% in 30 min (advertised), 15W wireless (MagSafe), 7.5W wireless (Qi)'
),
(default, 'Nova 11 Pro', 'nova-11-pro.png', 2023, 'GSM / CDMA / HSPA / CDMA2000 / LTE', '164.3 x 74.4 x 7.9 mm (6.47 x 2.93 x 0.31 in)',
'188 g or 193 g (6.63 oz)', 'Single SIM (Nano-SIM) or Dual SIM (Nano-SIM, dual stand-by)', 'OLED, 1B colors, HDR10, 120Hz',
'6.78 inches, 111.4 cm2 (~91.1% screen-to-body ratio)', '1200 x 2652 pixels (~429 ppi density)', 'HarmonyOS 3.0', 
'Qualcomm SM7325 Snapdragon 778G 4G (6 nm)', 'Octa-core (4x2.4 GHz Kryo 670 & 4x1.8 GHz Kryo 670)', 'Adreno 642L', false,
'512GB 8GB RAM', 'dual', '50 MP, f/1.9, (wide), PDAF, Laser AF;8 MP, f/2.2, 112˚ (ultrawide), AF', 'LED flash, panorama, HDR',
'4K, 1080p, 720p@960fps, gyro-EIS', 'dual', '8 MP, f/2.2, 52mm (portrait), AF;60 MP, f/2.4, 17mm, 100˚ (ultrawide), AF',
'HDR', '4K@30fps, 1080p@30fps, gyro-EIS', true, 'No', 'Wi-Fi 802.11 a/b/g/n/a/6, dual-band, Wi-Fi Direct',
'5.2, A2DP, LE', 'GPS (L1+L5), GLONASS (L1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5), NavIC', 'Yes; NFC-SIM, HCE',
'No', 'USB Type-C 2.0, OTG', 'Fingerprint (under display, optical), accelerometer, gyro, compass, color spectrum, Virtual proximity sensing',
'Li-Po 4500 mAh, non-removable', 'Wired 100W, 50% in 15 min (advertised)'
),
(default, 'Xperia 1 V', 'xperia-1-v.png', 2023, 'GSM / HSPA / LTE / 5G', '165 x 71 x 8.3 mm (6.50 x 2.80 x 0.33 in)',
'187 g (6.60 oz)', 'Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)', 'OLED, 1B colors, 120Hz, HDR BT.2020',
'6.5 inches, 98.6 cm2 (~84.2% screen-to-body ratio)', '1644 x 3840 pixels, 21:9 ratio (~643 ppi density)', 'Android 13',
'Qualcomm SM8550-AB Snapdragon 8 Gen 2 (4 nm)', 'Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)',
'Adreno 740', true, '256GB 12GB RAM', 'triple', 
'48 MP, f/1.9, 24mm (wide), 1/1.35", 1.12µm, Dual Pixel PDAF, OIS;12 MP, f/2.3, 85mm (telephoto), f/2.8, 125mm (telephoto), 1/3.5", Dual Pixel PDAF, 3.5x-5.2x continuous optical zoom, OIS;12 MP, f/2.2, 16mm (ultrawide), 1/2.5", Dual Pixel PDAF',
'Zeiss optics, Zeiss T* lens coating, LED flash, panorama, HDR, eye tracking', '4K@24/25/30/60/120fps HDR, 1080p@30/60/120fps; 5-axis gyro-EIS, OIS',
'single', '12 MP, f/2.0, 24mm (wide), 1/2.9", 1.25µm', 'HDR', '4K@30fps, 1080p@30/60fps, 5-axis gyro-EIS', true, 'Yes, 24-bit/192kHz audio, Dynamic vibration system', 
'Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct, DLNA', '5.3, A2DP, LE Audio, aptX HD, aptX Adaptive', 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS',
'Yes', 'No', 'USB Type-C 3.2, OTG, video output', 'Fingerprint (side-mounted), accelerometer, gyro, proximity, barometer, compass, color spectrum, Native Sony Alpha camera support',
'Li-Po 5000 mAh, non-removable', '30W wired, PD3.0, PPS, 50% in 30 min (advertised);Wireless;Reverse wireless'
)

insert into develop.produce (brand_id, phone_id) values
(1, 1), (1, 2), (3, 3), (2, 4), (6, 5), (9, 6)

insert into develop.tech_shops (shop_id, shop_name, shop_logo) values
(default, 'Ledikom', 'ledikom.png'),
(default, 'iStyle', 'istyle.png'),
(default, 'Setec', 'setec.png')

insert into develop.in_stock (shop_id, phone_id, quantity) values 
(1, 4, 2), (2, 4, 5), (3, 4, 0), (1, 2, 2)

insert into develop.works_for (user_id, shop_id) values 
(11, 3), (14, 2)