const appKey = 'a8955b02b5df475882038616d5448d43';
let signObj ={"appId":"ce83aaa3dedd42ab88bd017ce1ca2dd8","nonce":"df2614e624414020b9062f9512cd55d9","notifyUrl":"http://localhost/notifyUrl","outTradeNo":"2021101816345415670655d9","receiveName":"Org Name","returnUrl":"http://localhost/returnUrl","shortCode":"10011","subject":"GooName","timeoutExpress":"30","timestamp":"1634541567060","totalAmount":"10"};

signObj.appKey = appKey;

let StringA = jsonSort(signObj);
function jsonSort(jsonObj) {
let arr = [];
for (var key in jsonObj) {

arr.push(key);
}
arr.sort();
let str = '';

for (var i in arr) {

    str += arr[i] + "=" + jsonObj[arr[i]] + "&";

}
return str.substring(0, str.length);
};

let StringB = sha256(StringA);
function sha256(data) {
var hash = crypto.createHash('sha256');
hash.update(data);
return hash.digest('hex');
};

let sign = strings.toUpper(StringB);


let jsonObj ={"appId":"ce83aaa3dedd42ab88bd017ce1ca2dd8","nonce":"df2614e624414020b9062f9512cd55d9","notifyUrl":"http://localhost/notifyUrl","outTradeNo":"202110181634541567060","receiveName":"OrgName","returnUrl":"http://localhost/returnUrl","shortCode":"10011","subject":"Goods Name","timeoutExpress":"30","timestamp":"1634541567060","totalAmount":"10"};
let ussdjson = JSON.stringify(jsonObj);

let ussd = rsa_encrypt(ussdjson);

const rsa_encrypt = (data) => {
    let key = new NodeRSA(getPublicKey(publicKey));
    key.setOptions({encryptionScheme: 'pkcsl'});
    let encryptKey = key.encrypt(data, 'base64');
    return encryptKey;
}
function insertStr(str, insertStr, sn) {
    var newstr = '';
    for(var i = 0; i < str.length ; i+= sn){
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insertStr;
    }
    return newstr;
}

const getPublicKey = function (key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
const appId = 'ce83aaa3dedd42ab88bd017ce1ca2dd8';
let requestMessage={appid: signObj.appId, sign: sign, ussd:ussd};

const api = 'http://196.188.120.3:10443/service-openup/toTradeMobileIPay';

axios
      
        .post(api, requestMessage)
        .then(res => {
            if (res.status == 200 && res.data.code == 200) {
                rsp.redirect(res.data.data.toPayUrl);
            } else {
                console.error(res.data.message);
            }
        })

        .catch(error => {
            console.error(error);
        });