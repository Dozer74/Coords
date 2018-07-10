describe("Coords", function () {

    const coordsArray = [55.164742, 61.429509];

    describe('should be able to parse DD coordinates', function () {

        const expectedCoords = {
            format: 'dd',
            coords: coordsArray
        };

        it("with a comma and space", function () {
            const coords = '55.164742, 61.429509';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("with leading zeros", function () {
            const coords = '055.164742 061.429509';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("with spaces", function () {
            const coords = '55.164742  61.429509';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("with a semicolon without spaces", function () {
            const coords = '55.164742;61.429509';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("with a comma without spaces", function () {
            const coords = '55.164742,61.429509';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });
    });

    describe('should be able to parse Geo coordinates', function () {

        const expectedCoords = {
            format: 'geo',
            coords: coordsArray
        };

        it("with spaces", function () {
            const coords = '55 16 47 42, 61 42 95 09';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("in standart form", function () {
            const coords = '55°16\'47.42" 61°42\'95.09"';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("with N and E", function () {
            const coords = '55°16\'47.42"N 61°42\'95.09"E';

            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

    });

    describe('should be able to parse Plus coordinates', function () {
        const expectedCoords = {
            'format': 'plus',
            'coords': '9J73596R+JG'
        };

        it("in full form", function () {
            const coords = '9J73596R+JG';
            expect(parseCoords(coords)).toEqual(expectedCoords);
        });

        it("in short form", function () {
            const coords = '596R+JG';
            expect(parseCoords(coords)).toEqual(expectedCoords);
        });
    });
});