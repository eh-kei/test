// 仮の加盟施設データ（名前、緯度、経度）
const facilities = [
    { name: "川場スキー場", lat: 35.681236, lng: 139.767125 },
    { name: "斑尾スキー場", lat: 34.953467, lng: 135.76282 },
    { name: "施設C", lat: 43.06417,  lng: 141.34694  },
    { name: "施設D", lat: 35.689487, lng: 139.691711 },
    { name: "施設E", lat: 33.590355, lng: 130.401716 },
    { name: "施設F", lat: 38.268215, lng: 140.869356 },
    { name: "施設G", lat: 36.204824, lng: 138.252924 },
    { name: "施設H", lat: 34.685086, lng: 135.805 },
    { name: "施設I", lat: 32.750286, lng: 129.877667 },
    { name: "施設J", lat: 26.212401, lng: 127.680932 }
];

const button = document.getElementById('button');
const proceed = document.getElementById('proceed');
button.addEventListener('click', checkNearbyFacility);

// ユーザーの位置を取得して近くの施設を探す関数
function checkNearbyFacility() {
    const location = document.getElementById('location');

    if (!navigator.geolocation) {
        showLocationSettingHelp();
    return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const nearby = facilities.find(facility => {
                const dist = getDistance(userLat, userLng, facility.lat, facility.lng);
                return dist <= 10000; // 10km以内
            });

            if (nearby) {
                location.textContent = nearby.name;
                button.hidden = true;
                proceed.hidden = false;
            } else {
                alert("近くに施設は見つかりませんでした。");
            }
        },
        error => {
            showLocationSettingHelp();
        }
    );
}

// 2地点間の距離を計算（Haversine 公式）
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球の半径 (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// 位置情報の設定方法を案内
function showLocationSettingHelp() {
alert(`位置情報の利用を許可してください。

■ iOS（Safari の場合）
「設定」>「Safari」>「位置情報」で「このWebサイトに確認」または「許可」に設定してください。

■ Android（Chrome の場合）
ブラウザの右上メニュー >「設定」>「サイトの設定」>「位置情報」で許可を選択してください。`);
}