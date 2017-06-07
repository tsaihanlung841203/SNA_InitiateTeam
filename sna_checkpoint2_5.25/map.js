function twd97_to_latlng($x, $y) {
    var pow = Math.pow,
        M_PI = Math.PI;
    var sin = Math.sin,
        cos = Math.cos,
        tan = Math.tan;
    var $a = 6378137.0,
        $b = 6356752.314245;
    var $lng0 = 121 * M_PI / 180,
        $k0 = 0.9999,
        $dx = 250000,
        $dy = 0;
    var $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);
    $x -= $dx;
    $y -= $dy;
    var $M = $y / $k0;
    var $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
    var $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));
    var $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
    var $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
    var $J3 = (151 * pow($e1, 3) / 96.0);
    var $J4 = (1097 * pow($e1, 4) / 512.0);
    var $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);
    var $e2 = pow(($e * $a / $b), 2);
    var $C1 = pow($e2 * cos($fp), 2);
    var $T1 = pow(tan($fp), 2);
    var $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
    var $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);
    var $D = $x / ($N1 * $k0);
    var $Q1 = $N1 * tan($fp) / $R1;
    var $Q2 = (pow($D, 2) / 2.0);
    var $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
    var $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
    var $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4);
    var $Q5 = $D;
    var $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
    var $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
    var $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);
    $lat = ($lat * 180) / M_PI;
    $lng = ($lng * 180) / M_PI;
    return {
        lat: $lat,
        lng: $lng
    };
}
$('.overlay').hide();
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(24.98959, 121.5742083),
        mapTypeId: 'roadmap'
    });

    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        parking: {
            icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
            icon: iconBase + 'library_maps.png'
        },
        info: {
            icon: iconBase + 'info-i_maps.png'
        }
    };

    var features_public = { "result": { "offset": 0, "limit": 10000, "count": 65, "sort": "", "results": [{ "_id": "91", "id": "034", "area": "文山區", "name": "辛亥國小地下停車場", "summary": "為地下二層停車場，計有129個小型車停車格。", "address": "辛亥路4段103號地下", "tel": "0988-072-312", "payex": "每小時收費20元(全程以半小時計費)。", "serviceTime": "00:00:00~23:59:59", "totalCar": "126", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306385.240", "tw97y": "2766588.77", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "265", "id": "027", "area": "文山區", "name": "景華公園地下停車場", "summary": "立體式小型車746格(含身心障礙停車位15格)。", "address": "景華街55號地下", "tel": "2930-2054", "payex": "計時：每小時20元(全程以半小時計費)。月租：全日優惠3,000元，所在里全日月票2,688元，日間(7-19)2,400元，夜間(19-8)1,500元。本場提供計程車免費一小時服務。", "serviceTime": "00:00:00~23:59:59", "totalCar": "731", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304892.459", "tw97y": "2765362.80", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "266", "id": "309", "area": "文山區", "name": "景豐臨時平面停車場", "summary": "計有44個小型車停車位", "address": "景豐街79號旁", "tel": "  ", "payex": "(100.2.1委外)計時20元。全日月票4,800元，全日里民優惠月票3,840元(萬盛里、萬祥里及萬有里)，全日月票3360元/月(興豐里)，身心障礙者憑證購買月票半價。", "serviceTime": "00:00:00~23:59:59", "totalCar": "43", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304985.047", "tw97y": "2766176.03", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "348", "id": "MA62", "area": "文山區", "name": "木柵停車場", "summary": "為平面停車場，計有78格小型車格", "address": "興安段1小段389-1地號；興隆路3段192巷8弄27號旁空地", "tel": "2246-1708#15", "payex": "40元/時，停車逾1小時以上者，未滿半小時以半小時計費。4000元/月", "serviceTime": "24小時", "totalCar": "76", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306210.50060", "tw97y": "2765654.75950", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "351", "id": "MA65", "area": "文山區", "name": "義芳停車場", "summary": "為平面停車場，計有17個小型車停車位。", "address": "興隆路1段125巷10-1號旁空地；興隆段3小段208、208-1、208-2地號", "tel": "2306-2131", "payex": "月租：3000元/月。", "serviceTime": "24小時", "totalCar": "16", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304783.13600", "tw97y": "2766139.02510", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "355", "id": "MA67", "area": "文山區", "name": "便利停車場瀚星站", "summary": "", "address": "景興路188號B3、B4", "tel": "2799-1001 #155", "payex": "60元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：5500元/月、日間：4500元/月、夜間：3500元/月。", "serviceTime": "24小時", "totalCar": "41", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304897.63040", "tw97y": "2765044.90810", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "357", "id": "MA66", "area": "文山區", "name": "長揚停車場木柵站", "summary": "", "address": "木柵路1段58巷口空地；華興段4小段502-2、509、511~513、515-2、516、517-2地號", "tel": "2761-9188", "payex": "計時：汽車40元/時，機車20元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。計次：機車30元/次。汽車月租：4500元/月，夜間2000元/月(19~08)，日間3000元/月(08~19)。", "serviceTime": "24小時", "totalCar": "16", "availableCar": null, "totalMotor": "8", "availableMotor": null, "totalBike": "0", "tw97x": "305267.26900", "tw97y": "2764423.24730", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "360", "id": "MA69", "area": "文山區", "name": "木柵停車場", "summary": "", "address": "木柵段1小段509、510地號；木柵路3段77巷9號對面", "tel": "2791-8686", "payex": "50元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。", "serviceTime": "24小時", "totalCar": "10", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307239.92380", "tw97y": "2764700.03720", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "362", "id": "MA68", "area": "文山區", "name": "磐石景美站停車場", "summary": "", "address": "景美段5小段343-1地號；景中街30巷6-2號", "tel": "2706-2668", "payex": "60元/時。月租：日間5000元，夜間4000元，全日6000元。", "serviceTime": "24小時", "totalCar": "3", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304722.25520", "tw97y": "2765062.52520", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "367", "id": "MA61", "area": "文山區", "name": "群旺企業社景隆營業所", "summary": "立體式小型車73格(含身心障礙停車位1格)。", "address": "景隆街36巷2號B1", "tel": "2931-1625", "payex": "計時：20元/時，停車未滿1小時以1小時計，停車逾1小時以上者，未滿半小時以半小時計費。月租3,800元/月。", "serviceTime": "24小時", "totalCar": "72", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304919.12990", "tw97y": "2765698.70210", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "385", "id": "MA70", "area": "文山區", "name": "博客停車場萬慶站", "summary": "", "address": "萬慶街37巷3號旁空地；萬慶段2小段841地號", "tel": "2948-8889", "payex": "計時：50元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：5000元/月。", "serviceTime": "24小時", "totalCar": "49", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304373.30260", "tw97y": "2765110.32690", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "461", "id": "085", "area": "文山區", "name": "臺北花木批發市場地下停車場", "summary": "立體式小型車409格(含身心障礙停車位9格)。", "address": "興隆路1段15號地下", "tel": "2931-8160", "payex": "計時20元，全程以半小時計費，月租：全日月票3,500元，日間月票2,400元(7-19)，夜間月票1,500元(19-8)。本場提供計程車免費一小時服務。", "serviceTime": "00:00:00~23:59:59", "totalCar": "409", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304569.681", "tw97y": "2766376.70", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "797", "id": "M004", "area": "文山區", "name": "興隆市場旁停車場", "summary": "為廣場平面停車場，計有43個小型車停車格。", "address": "興隆路二段97號旁", "tel": "2786-7755", "payex": "計時：20元/時，全程以半小時計費。月租：全日4,800元，里民優惠全日3,840元(興福里、興邦里及興安里)，興豐里3,360元。", "serviceTime": "24小時", "totalCar": "40", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305227.93300", "tw97y": "2765851.91600", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "801", "id": "M003", "area": "文山區", "name": "溪洲街平面停車場", "summary": "為平面停車場，計有19個小型車停車格。", "address": "汀州路4段、溪洲街口", "tel": "2786-7755", "payex": "計時：20元/時，全程以半小時計費。月租：全日4,800元，里民優惠全日3,840元(萬年里、萬隆里)、3,360元(萬和里)。", "serviceTime": "24小時", "totalCar": "17", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304043.85420", "tw97y": "2766348.57830", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "804", "id": "M002", "area": "文山區", "name": "水源快速道路高架橋下停車場", "summary": "橋下平面式小型車176格(含身心障礙停車位3格)。橋下平面式機車119格(含身心障礙停車位2格)。", "address": "汀州路四段51號-137巷間", "tel": "", "payex": "計次：小型車50元/次，機車免費。", "serviceTime": "9-17", "totalCar": "173", "availableCar": null, "totalMotor": "117", "availableMotor": null, "totalBike": "0", "tw97x": "304026.26430", "tw97y": "2766319.25710", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "815", "id": "M009", "area": "文山區", "name": "萬慶街平面停車場", "summary": "一般平面式小型車23格(含身心障礙停車位1格)。", "address": "萬慶街48號對面", "tel": "", "payex": "計時：20元/時，全程以半小時計費。", "serviceTime": "9-17", "totalCar": "22", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304325.58200", "tw97y": "2765160.93480", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "816", "id": "M008", "area": "文山區", "name": "景文平面停車場", "summary": "一般平面式小型車55格(含身心障礙停車位1格)。", "address": "景文街90巷內廣場停車場", "tel": "", "payex": "計時：30元/時，全程以半小時計費。", "serviceTime": "9-17", "totalCar": "54", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304558.95940", "tw97y": "2764833.82910", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "826", "id": "202", "area": "文山區", "name": "捷運木柵站轉乘停車場", "summary": "", "address": "木柵路4段135號", "tel": "2550-5600", "payex": "汽車：20元/時(06-22)；10元/時(22-06)，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計費。月租：全天3000元/月；日間：1500元/月；夜間：1200元/月。機車計次20元/次(凌晨2時為準，跨日另計)。機車月租：300元/月。", "serviceTime": "00:00:00~23:59:59", "totalCar": "147", "availableCar": null, "totalMotor": "154", "availableMotor": null, "totalBike": "0", "tw97x": "307866.761", "tw97y": "2765744.61", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "834", "id": "M015", "area": "文山區", "name": "和興路平面停車場", "summary": "共有19個小型車格", "address": "和興路78與84巷之間", "tel": "2542-0001", "payex": "(100.2.1委外)計時20元。全日月票4800元，全日月票3840元(華興里)，全日月票3360元(試院里)。", "serviceTime": "24小時", "totalCar": "18", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305379.42400", "tw97y": "2764211.01590", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "839", "id": "M014", "area": "文山區", "name": "萬芳八號公園停車場", "summary": "一般平面式小型車109格(含身心障礙停車位3格)。", "address": "文山區公務員訓練中心旁", "tel": "", "payex": "計次：50元/次。", "serviceTime": "9-17", "totalCar": "106", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306598.13830", "tw97y": "2766225.41790", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "844", "id": "M011", "area": "文山區", "name": "永建市場旁平面停車場", "summary": "為平面停車場，計有18個小型車停車位。", "address": "木柵路191巷內", "tel": "2771-2613", "payex": "計時：20元/時，全程以半小時計費。月租：4,800元，所在里(華興里)里民優惠3,360元，周邊里(試院里、樟林里)里民優惠3,840元。", "serviceTime": "24小時", "totalCar": "18", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305656.12400", "tw97y": "2764580.78900", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "847", "id": "M010", "area": "文山區", "name": "保儀路平面停車場", "summary": "為平面停車場，計有48個小型車停車位。", "address": "保儀路157號對面", "tel": "2771-2613", "payex": "計時：20元/時，全程以半小時計費。月租：4,800元，所在里(順興里)3,360元，周邊里(忠順、木新、樟腳、木柵里)3,840元。", "serviceTime": "24小時", "totalCar": "48", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307138.73900", "tw97y": "2764166.12070", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "853", "id": "M016", "area": "文山區", "name": "國家考場大樓地下停車場", "summary": "計有130個小型車格，93個機車格", "address": "木柵路1段72號B1、B2", "tel": "2236-9188#3199", "payex": "小型車30元/時(08-18)，15元/時(18-08)，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計費。全日3,500元/月，日間1,800元/月，夜間1,800元/月，機車月租300元/月，機車計次20/次(按日累計計算)。", "serviceTime": "24小時", "totalCar": "127", "availableCar": null, "totalMotor": "90", "availableMotor": null, "totalBike": "0", "tw97x": "305458.62290", "tw97y": "2764465.67810", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "854", "id": "208", "area": "文山區", "name": "博嘉運動公園停車場", "summary": "計有36格小型車格", "address": "木柵路4段159巷16號B2", "tel": "2239-5495", "payex": "20元/時，全程以半小時計費，1500元/月。", "serviceTime": "05:30:00~21:00:00", "totalCar": "35", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "308098.673", "tw97y": "2766013.13", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "855", "id": "M019", "area": "文山區", "name": "驛林交通股份有限公司興隆站", "summary": "計46個立體小型車停車位。", "address": "興隆路二段160號B1、B2；興安段2小段73、76地號", "tel": "2362-1685#11", "payex": "20元/時。全程以半小時計費。月租4800元/月。", "serviceTime": "24小時", "totalCar": "44", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305662.81400", "tw97y": "2766059.29470", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "857", "id": "M018", "area": "文山區", "name": "協和上城停車場", "summary": "", "address": "興隆路四段58巷16弄6號B1-B2", "tel": "02-2937-2608", "payex": "月租3500元至5000元", "serviceTime": "24小時", "totalCar": "30", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306600.20212", "tw97y": "2764318.97134", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "916", "id": "226", "area": "文山區", "name": "樟新平面停車場", "summary": "為平面停車場，計有46個小型車格", "address": "一壽街3巷與17巷之間", "tel": "02-2455-1299", "payex": "每半小時10元。全日月票4,800元，全日里民優惠月票3,840元(樟腳里)，里民優惠月票3,360元(樟新里)。", "serviceTime": "00:00:00~23:59:59", "totalCar": "45", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306213.500", "tw97y": "2763636.18", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "921", "id": "227", "area": "文山區", "name": "政大三街臨時平面停車場", "summary": "為平面停車場，計有50個小型車格", "address": "臺北市文山區政大三街53號旁", "tel": "02-2455-1299", "payex": "計時20元，全程以半小時計費。月租：全日里民優惠(政大里及指南里)900元/月。計次：每日每次收費最高上限為30元(每日零時重新計算)", "serviceTime": "00:00:00~23:59:59", "totalCar": "49", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "308798.633", "tw97y": "2764367.61", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "923", "id": "228", "area": "文山區", "name": "木柵路三段平面停車場", "summary": "計有48個小型車格", "address": "木柵路三段47號對面", "tel": "02-2455-1299", "payex": "計時20元/時", "serviceTime": "00:00:00~23:59:59", "totalCar": "47", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307167.607", "tw97y": "2764612.60", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "960", "id": "114", "area": "文山區", "name": "景美國小地下停車場", "summary": "立體式小型車253格(含身心障礙停車位6格)。立體式機車92格(含身心障礙停車位3格)。", "address": "景文街142巷2號地下。", "tel": "2930-1538", "payex": "計時：20元/時，全程以半小時計費。月租：全日4,800元，日間2,000元(7-19)，夜間月票1,200元(19-8)，所在里、里民全日月票3,000元，機車計次20元，機車月票300元。本場提供計程車免費一小時服務。", "serviceTime": "00:00:00~23:59:59", "totalCar": "253", "availableCar": null, "totalMotor": "92", "availableMotor": null, "totalBike": "10", "tw97x": "304540.653", "tw97y": "2764633.54", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "961", "id": "115", "area": "文山區", "name": "木柵動物園停車場", "summary": "堤外平面式小型車962格(含身心障礙停車位19格)。", "address": "河川高灘地", "tel": "8661-6795", "payex": "計次：週一至週五50元/次、計時：假日(含週六及週日、行政機關放假之紀念日及民俗節日)60元/時。月租：優惠月票500元/月(不含假日)。", "serviceTime": "00:00:00~23:59:59", "totalCar": "943", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "308397.796", "tw97y": "2765648.87", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "963", "id": "113", "area": "文山區", "name": "興隆公園地下停車場", "summary": "立體式小型車259格(含身心障礙停車位6格)。立體式機車58格(含身心障礙停車位5格)。", "address": "仙岩路128號地下", "tel": "2933-5014", "payex": "計時：20元/時全程以半小時計費。月租：全日4,800元，所在里里民優惠2,700元，一般民眾及一般里民全日均以3,000元優惠；機車計次20元，機車月票300元。本場提供計程車免費一小時服務。", "serviceTime": "00:00:00~23:59:59", "totalCar": "259", "availableCar": null, "totalMotor": "58", "availableMotor": null, "totalBike": "8", "tw97x": "305649.457", "tw97y": "2765912.01", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "973", "id": "128", "area": "文山區", "name": "萬興國小地下停車場", "summary": "立體式小型車234格(含身心障礙停車位5格)。立體式機車188格(含身心障礙停車位4格)。", "address": "秀明路2段116號地下", "tel": "2759-0666", "payex": "計時：20元/時，全程以半小時收費。月租：3,500元，所在里2,500元；一般里民3,000元；日間1,800元(8-20)；夜間月票2,000元(20-08及假日)，夜間月票(二)1,000元(15-01及假日)。 機車計次20元，機車月票300元。本場提供計程車免費一小時服務。", "serviceTime": "00:00:00~23:59:00", "totalCar": "229", "availableCar": null, "totalMotor": "184", "availableMotor": null, "totalBike": "0", "tw97x": "308206.151", "tw97y": "2764729.86", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1006", "id": "142", "area": "文山區", "name": "動物園站地下停車場", "summary": "為地下立體停車場，計有200格機車格，150格小型車格", "address": "新光路2段28號", "tel": "25505600", "payex": "平日20元/時(06-22)，10元/時(22-06)，假日60元/時(06-22)，10元/時(22-06)，停車未滿1小時以1小時計費，逾1小時以上者，未滿半小時以半小時計費。機車20元/次，隔日另計(凌晨2時為基準)。", "serviceTime": "00:00:00~23:59:59", "totalCar": "146", "availableCar": null, "totalMotor": "196", "availableMotor": null, "totalBike": "0", "tw97x": "308423.211", "tw97y": "2765610.24", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1051", "id": "M049", "area": "文山區", "name": "忠順超市停車塔", "summary": "為塔台停車場，計有42個小型停車格", "address": "忠順街2段22號", "tel": "2662-4110", "payex": "全日每月6000元/月。", "serviceTime": "24小時", "totalCar": "41", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306834.97330", "tw97y": "2764163.06820", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1053", "id": "M045", "area": "文山區", "name": "景興國小停車場", "summary": "為平面停車場，計有26個小型車格", "address": "景華街150巷21號", "tel": "2932-9438#48", "payex": "9000元/半年", "serviceTime": "每日1800~翌日0700；例假日全天", "totalCar": "26", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305351.65230", "tw97y": "2765474.03650", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1054", "id": "M046", "area": "文山區", "name": "富達停車場", "summary": "為平面停車場，計有10個小型車格", "address": "萬芳路11號", "tel": "0933038222", "payex": "30元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：每月5500元。", "serviceTime": "24小時", "totalCar": "9", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307373.01550", "tw97y": "2765786.56770", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1055", "id": "M047", "area": "文山區", "name": "永安藝文館停車場", "summary": "為立體停車場，計有58個小型車格", "address": "木新路2段156-1號1樓及B1", "tel": "29393088", "payex": "30元/時，全程以半小時計費。戶外10500元/季，機械11400元/季，室內13500元/季", "serviceTime": "臨時：二至六9時至21時30分，周日9-18、週一及", "totalCar": "57", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307415.95830", "tw97y": "2764168.75720", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1056", "id": "M048", "area": "文山區", "name": "光輝停車場", "summary": "為平面停車場，計有14個小型停車格", "address": "實踐段1小段266地號；光輝路92號旁空地", "tel": "2455-1299", "payex": "80元/時。停車未滿1小時以1小時計；停車逾1小時以上者，未滿半小時以半小時計費。全日10000元/月，半日5000元/月，保證金2000元。", "serviceTime": "24小時", "totalCar": "13", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306146.12140", "tw97y": "2764190.44490", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1058", "id": "M043", "area": "文山區", "name": "台北市文山運動中心停車場", "summary": "為地下停車場，計有79個小型車格", "address": "興隆路3段222號B1~B2", "tel": "2230-8268", "payex": "計時：30元/時，全程以半小時計費。月租：4,200/月，8,820/季。", "serviceTime": "06-23；月租24小時", "totalCar": "79", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306476.52830", "tw97y": "2765550.60580", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1059", "id": "M044", "area": "文山區", "name": "義芳第三停車場", "summary": "為平面停車場，計有49個小型車格", "address": "景豐街13號對面空地；興隆段2小段365、319-2地號", "tel": "2306-2131", "payex": "30元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計費。3000元/月。", "serviceTime": "24小時", "totalCar": "49", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305148.37280", "tw97y": "2765870.26270", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1060", "id": "M060", "area": "文山區", "name": "益彩國際股份有限公司-燦坤停車場", "summary": "計有18個小型車格", "address": "景美段4小段221地號；景後街83號旁空地", "tel": "89829119", "payex": "平日(08-17)30元/小時,平日(17：01-23)40元/小時,未滿1小時以1小時計,1小時以上未滿半小時以半小時計,月租2500元", "serviceTime": "臨停15H月租24小時", "totalCar": "17", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304850.17670", "tw97y": "2765057.58010", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1067", "id": "M058", "area": "文山區", "name": "賀達忠順停車場", "summary": "", "address": "忠順街2段22號地下1樓", "tel": "0981504435", "payex": "40元/時，全程以半小時計費。購物滿300元停車限1小時內免費。4000元/月。", "serviceTime": "24小時", "totalCar": "17", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306850.68950", "tw97y": "2764178.81220", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1068", "id": "M059", "area": "文山區", "name": "興隆停車場", "summary": "為平面停車場，計有2個小型車格", "address": "台北市文山區興隆路三段205號旁", "tel": "02-2498-9397", "payex": "每月4500元", "serviceTime": "24H", "totalCar": "1", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306528.04730", "tw97y": "2765394.70560", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1069", "id": "M057", "area": "文山區", "name": "木柵永建停車場", "summary": "為立體地下停車場，計有17個小型車格", "address": "木柵路1段177號地下1樓", "tel": "2722-9208", "payex": "計時：平日20元/時，假日30元/時，全程以半小時計費。月租：3,300元/月。", "serviceTime": "24小時", "totalCar": "17", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305621.27190", "tw97y": "2764542.03210", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1070", "id": "M054", "area": "文山區", "name": "興福國民中學停車場", "summary": "為平面停車場，計有27個小型車停車位。", "address": "福興路80號", "tel": "2932-2024#410", "payex": "6000元/季，10800元/半年，19200元/年", "serviceTime": "週一至週五17:30至翌日07:00、週", "totalCar": "26", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305530.98840", "tw97y": "2766440.22110", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1071", "id": "M052", "area": "文山區", "name": "便利停車場萬盛站", "summary": "為平面停車場，計有21個小型車停車位。", "address": "萬盛街146巷6號旁空地；興隆段3小段473、473-1地號", "tel": "2799-1001#155", "payex": "月租：全日每月3,500元。", "serviceTime": "24小時", "totalCar": "20", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304745.50340", "tw97y": "2766464.62430", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1072", "id": "M053", "area": "文山區", "name": "義芳第五停車場", "summary": "為平面停車場，計有20個小型車，13個大型車，10個機車", "address": "興隆路與興順街口；文山區興隆段3小段282、283、286、287、300", "tel": "2306-2131", "payex": "大客車50元/時、小客車30元/時、機車10元/時、大客車6000元/月、小客車3000元/月", "serviceTime": "24H", "totalCar": "18", "availableCar": null, "totalMotor": "9", "availableMotor": null, "totalBike": "0", "tw97x": "304871.14530", "tw97y": "2765949.54610", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1074", "id": "M027", "area": "文山區", "name": "木農停車場", "summary": "為平面停車場，計有47個小車格", "address": "木柵段1小段219、220、242、242-1地號；保儀路13巷與集英路口", "tel": "2939-5969", "payex": "30元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計費。全日3000元/月，半日3000元(08~20或20~08)/月。", "serviceTime": "6時至20時", "totalCar": "46", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307530.27950", "tw97y": "2764647.18930", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1075", "id": "II04", "area": "文山區", "name": "達觀淳境社區停車場", "summary": "立體式小型車11格(含身心障礙停車位1格)。", "address": "景華街128巷2弄7號", "tel": "8227-8686", "payex": "計時：50元/時(9-17)，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：全日6,500元，日間(9-17)3,000元，夜間(17-9)3,500元。", "serviceTime": "24小時", "totalCar": "11", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305238.41041", "tw97y": "2765346.77166", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1076", "id": "M020", "area": "文山區", "name": "萬芳醫院附設停車場", "summary": "計255個小型車停車位。", "address": "興隆路3段111號B2、B3", "tel": "2930-7930#8204", "payex": "40元/時，前30分鐘免費，全程以半小時計費。", "serviceTime": "24小時", "totalCar": "255", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306323.17730", "tw97y": "2765876.90490", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1077", "id": "M021", "area": "文山區", "name": "仙岩停車場", "summary": "計49個小型車停車位。", "address": "興安段2小段570、571、573、573-1地號；仙岩路47號對面空地", "tel": "2931-3655", "payex": "4200元/月，季租", "serviceTime": "NULL", "totalCar": "48", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305451.22830", "tw97y": "2765814.22390", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1078", "id": "M023", "area": "文山區", "name": "忠順停車場", "summary": "平面停車場，計有5個小型車格", "address": "實踐段1小段310地號.忠順街1段41巷8號旁", "tel": "24551299", "payex": "80元/時。停車未滿1小時以1小時計；停車逾1小時以上者，未滿半小時以半小時計費。全日10000元/月，半日5000元/月，保證金2000元。", "serviceTime": "24小時", "totalCar": "4", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306394.38880", "tw97y": "2764214.88920", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1079", "id": "II01", "area": "文山區", "name": "嘟嘟房文山光輝站停車場", "summary": "一般平面式小型車14格(含身心障停車位1格)", "address": "文山區實踐段1小段266地號；光輝路78巷13號", "tel": "(02)2655-1516", "payex": "全日每月月租10000元", "serviceTime": "24小時", "totalCar": "13", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306148.32074", "tw97y": "2764183.24016", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1080", "id": "II02", "area": "文山區", "name": "助安168萬芳停車場", "summary": "一般平面式小型車29格(含身心障礙停車位1格)。", "address": "興隆路3段192巷2弄23號旁空地，文山區興安段1小段84、85、92、93、100、101、106地號。", "tel": "2754-6661#18", "payex": "計時：60元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：8,000元/月。", "serviceTime": "24小時", "totalCar": "29", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306247.30998", "tw97y": "2765706.42531", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1081", "id": "M025", "area": "文山區", "name": "臺北市文山區文山行政中心地面停車場", "summary": "計55個小型車停車格位", "address": "木柵路3段220號", "tel": "2936-5522 #326", "payex": "計時：日間30元/時(07-20)，洽公民眾前30分鐘免費；非洽公民眾、週六、週日30元/時(07-20)；夜間10元/時(週一至週日20-07)，最高收費至50元。全程以半小時計費。月租：2,000元/月(週一至週日18-08、週六至週日08-18)；1,200元/月(週一至週日18-08)，不含磁卡保證金。國定假?", "serviceTime": "24小時", "totalCar": "53", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "307550.59110", "tw97y": "2764742.73760", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1082", "id": "II03", "area": "文山區", "name": "玫如台大四季停車場", "summary": "立體式小型車30格(含身心障礙停車位1格)。立體式機車15格(含身心障礙停車位1格)。", "address": "羅斯福路六段68、70、72號1樓及B2~B4", "tel": "2555-7288", "payex": "計時：100元/時，停車未滿1小時以1小時計，逾1小時以上者，未滿半小時以半小時計。月租：全日10,000元/月。", "serviceTime": "24小時", "totalCar": "30", "availableCar": null, "totalMotor": "15", "availableMotor": null, "totalBike": "0", "tw97x": "304512.73910", "tw97y": "2765727.75283", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1083", "id": "M026", "area": "文山區", "name": "景新大樓地下停車場", "summary": "計有47格小型停車格", "address": "景後街151號B2、B3", "tel": "0922-772-192", "payex": "50元/時，全程以半小時計費。全日6000元/月。", "serviceTime": "24小時", "totalCar": "47", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304717.82360", "tw97y": "2764780.46410", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1085", "id": "M038", "area": "文山區", "name": "義芳第二停車場", "summary": "為平面停車場，計有150個小車格", "address": "興隆段3小段218-3、218-5、331、331-1~6地號；興隆路1段125巷10-1號旁空地", "tel": "2306-2131", "payex": "3000元/月。", "serviceTime": "24小時", "totalCar": "148", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304802.59630", "tw97y": "2766092.94080", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1086", "id": "M032", "area": "文山區", "name": "宏和停車場", "summary": "為平面停車場，計有48個小型車停車格", "address": "興安段1小段322地號；興隆路3段112巷11號對面", "tel": "29340034", "payex": "40元/時，停車逾1小時以上者，未滿半小時以半小時計費。", "serviceTime": "24小時", "totalCar": "47", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "306192.12320", "tw97y": "2765727.32790", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1087", "id": "M033", "area": "文山區", "name": "麗園停車場", "summary": "計有36格小型車", "address": "汀州路4段5號", "tel": "2930-4326", "payex": "50元/時，停車逾1小時以上者，未滿半小時以半小時計費。", "serviceTime": "20時至翌日2時", "totalCar": "35", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304162.79090", "tw97y": "2767074.22520", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1088", "id": "M034", "area": "文山區", "name": "興安停車場", "summary": "為平面停車場，計有48個小型車停車位。", "address": "興安段2小段546-1.573-2.573-3.573-4地號，仙岩路47號對面空地", "tel": "2931-3655", "payex": "4200元/月，以季租收費", "serviceTime": "NULL", "totalCar": "47", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "305428.76340", "tw97y": "2765779.70500", "type": "2", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1220", "id": "101", "area": "文山區", "name": "捷運木柵機廠停車場", "summary": "為立體停車場，計有681個小型車停車位。", "address": "新光路2段19號", "tel": "2550-5600#3218", "payex": "150元/次，隔夜車另計天數(以凌晨零時為基準)。", "serviceTime": "00:00:00~00:02:00", "totalCar": "681", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "308942.267", "tw97y": "2765981.74", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1236", "id": "297", "area": "文山區", "name": "和平東路四段３８１巷平面停車場", "summary": "為平面停車場，計有25個小型車停車位。", "address": "和平東路四段381巷內", "tel": "24551299", "payex": "每半小時10元。全日月票4,800元，全日里民優惠月票3,840元，所在里(文山區博嘉里)全日里民優惠月票3,360元，身心障礙者憑證購買前述月票均可享有半價優惠。", "serviceTime": "00:00:00~23:59:59", "totalCar": "24", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "308021.595", "tw97y": "2765845.91", "type": "1", "_full_count": "65", "rank": "0.0573088" }, { "_id": "1238", "id": "298", "area": "文山區", "name": "三福街平面停車場", "summary": "為平面停車場，計有39個小型停車格。", "address": "景隆街36巷內", "tel": " ", "payex": "(100.2.1委外)計時20元。全日月票4,800元，全日月票3,840元/月(景仁里、景華里、興福里及興豐里)。全日月票3360元/月(萬有里)，身心障礙者憑證購買月票半價。", "serviceTime": "00:00:00~23:59:59", "totalCar": "38", "availableCar": null, "totalMotor": "0", "availableMotor": null, "totalBike": "0", "tw97x": "304800.299", "tw97y": "2765709.35", "type": "1", "_full_count": "65", "rank": "0.0573088" }] } };

    for (var i = 0; i < features_public.result.count; i++) {

        let contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<h1 id="firstHeading" class="firstHeading">' + features_public.result.results[i].name + '</h1>' +
            '<p>簡介：' + features_public.result.results[i].summary + '<br>' +
            '<p>收費：' + features_public.result.results[i].payex + '<br>' +
            '剩餘車位：' + features_public.result.results[i].totalCar + '<br>' +
            '上次更新：5分鐘前</p>' +
            '<a href=' + features_public.result.results[i].link + '>開始導航</a>' +
            '</div>' +
            '</div>';

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        let lat = twd97_to_latlng(features_public.result.results[i].tw97x, features_public.result.results[i].tw97y);

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat.lat, lat.lng),
            icon: icons['parking'].icon,
            map: map
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    };

    get_temp(function (index, value) {

        console.log(value);

        let infowindow = new google.maps.InfoWindow({
            content: value.content
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(value.lat, value.lng),
            icon: value.icon,
            map: map
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    })
    get_private(function (index, value) {

        console.log(value);

        let contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '<h1 id="firstHeading" class="firstHeading">' + value.name + '</h1>' +
            '</div>' +
            '<div id="bodyContent">' +
            '<p>時段：' + value.time + '</a>' +
            '<p>價格：' + value.fee + '</a>' +
            '<p>車位號碼：' + value.number + '</a><br>' +
            '<img src=' + value.img + ' height="100"><br>' +
            '<a href=' + value.link + '>開始導航</a>' +
            '</div>' +
            '</div>';

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(value.lat, value.lng),
            icon: value.icon,
            map: map
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    })

    map.addListener('click', function (e) {
        var visible = $('.overlay').is(':visible')
        if(visible){
            $('.overlay').hide();
        }
        else{
            $('.overlay').show();
            $('#lat').val(e.latLng.lat());
            $('#lng').val(e.latLng.lng());
        }
    });

}

$('#add_private').click(()=>{    
    push_private($('#name').val(), $('#fee').val(), $('#lat').val(), $('#lng').val(), $('#img').val(), $('#number').val(), $('#time').val(), $('#link').val());
})

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}