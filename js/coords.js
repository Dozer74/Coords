function parseCoords(text) {

    function getFloat(groupValue) {
        return Number.parseFloat(groupValue.replace(',', '.').replace(' ', '.'));
    }

    function parseDD(text) {

        const regDD = /(?<lat>\d{1,3}[.,\s]\d+)[,;\s]+(?<lng>\d{1,3}[.,\s]\d+)/i;
        const res = regDD.exec(text);
        if (!res) {
            return null;
        }

        return [
            getFloat(res.groups.lat),
            getFloat(res.groups.lng)
        ];
    }

    function parseGeo(text) {
        console.log('foo');
        const regGeo = /(?<latGrad>\d{1,3})(\s+|°)(?<latMin>\d{1,2})(\s+|')(?<latSec>\d{1,2})(\s+|\.)(?<latMs>\d+)"?N?[,;\s]+(?<lngGrad>\d{1,3})(\s+|°)(?<lngMin>\d{1,2})(\s+|')(?<lngSec>\d{1,2})(\s+|\.)(?<lngMs>\d+)"?E?/i;
        const res = regGeo.exec(text);
        if (!res) {
            return null;
        }
        const g = res.groups;
        return parseDD(`${g.latGrad}.${g.latMin}${g.latSec}${g.latMs} ${g.lngGrad}.${g.lngMin}${g.lngSec}${g.lngMs}`);
    }

    function parsePlus(text) {
        const regPlusLong = /[a-zA-Z\d]{8}\+[a-zA-Z\d]{2}/i;
        const regPlusShort = /[a-zA-Z\d]{4}\+[a-zA-Z\d]{2}/i;
        const prefix = '9J73'; // Челяб. обл.

        let res = regPlusLong.exec(text);
        if (res) {
            return res[0];
        }

        res = regPlusShort.exec(text);
        if (res) {
            return prefix + res[0];
        }
    }

    function parseW3(text) {
        const regW3 = /(\/{3})?(?<words>([а-я]+\.){2}[а-я]+)/i;
        const res = regW3.exec(text);
        return res ? res.groups.words : null;
    }

    let res = parseGeo(text);
    if (res) {
        return {
            coords: res,
            format: 'geo'
        }
    }

    res = parseDD(text);
    if (res) {
        return {
            coords: res,
            format: 'dd'
        }
    }

    res = parsePlus(text);
    if (res) {
        return {
            coords: res,
            format: 'plus'
        }
    }

    res = parseW3(text);
    if (res) {
        return {
            coords: res,
            format: 'w3'
        }
    }

    return res;
}