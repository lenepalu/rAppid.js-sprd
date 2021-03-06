var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    _ = require('underscore'),
    testRunner = require('rAppid.js').TestRunner.setup();

var C = {};

describe('sprd.entity.Address', function () {

    before(function (done) {
        testRunner.requireClasses({
            Address: 'sprd/entity/Address',
            Country: 'sprd/entity/Country',
            Person: 'sprd/entity/Person'
        }, C, done);

    });

    var address;

    beforeEach(function () {
        address = new C.Address();
    });

    describe('supportsCounty', function () {

        it('should return true for GB and IE', function () {

            address.set('country', new C.Country({code: 'GB'}));

            expect(address.needsCounty()).to.equal(false);

            address.set('country', new C.Country({code: 'IE'}));

            expect(address.needsCounty()).to.equal(true);
        });

        it('should return false for everything else', function () {
            address.set('country', new C.Country({code: 'DE'}));

            expect(address.needsCounty()).to.equal(false);
        });

        it('should have country annotation', function () {
            expect(C.Address.prototype.needsCounty._attributes).to.contain("country");
        });

    });

    describe('isStateRequired', function () {

        it('should return true for US', function () {
            address.set('country', new C.Country({code: 'US'}));

            expect(address.isStateRequired()).to.equal(true);

            address.set('country', new C.Country({code: 'IE'}));

            expect(address.isStateRequired()).to.equal(false);
        });

        it('should return false for everything else', function () {
            address.set('country', new C.Country({code: 'DE'}));

            expect(address.isStateRequired()).to.equal(false);
        });


        it('should have country annotation', function () {
            expect(C.Address.prototype.isStateRequired._attributes).to.contain("country");
        });
    });

    describe('needsZipCode', function () {

        it('should return false for IE', function () {
            address.set('country', new C.Country({code: 'IE'}));

            expect(address.needsZipCode()).to.equal(false);
        });

        it('should return true for other country', function () {
            address.set('country', new C.Country({code: 'DE'}));

            expect(address.needsZipCode()).to.equal(true);
        });

        it('should have country annotation', function () {
            expect(C.Address.prototype.needsZipCode._attributes).to.contain("country");
        });

    });

    describe('isCompany', function () {

        it('should return true when salutation of person is 4', function () {
            address.set('person', new C.Person({'salutation': "4"}));

            expect(address.isCompany()).to.equal(true);
        });


        it('should return false when salutation of person is not 4', function () {
            address.set('person', new C.Person({'salutation': "2"}));

            expect(address.isCompany()).to.equal(false);
        });

        it('should have an onChange person.salutation binding', function () {
            expect(C.Address.prototype.isCompany._attributes).to.contain("personSalutation");
        });

    });

    describe('_commitChangedAttributes', function () {


        it('should set type from PACKSTATION to PRIVATE when switching Country from DE to something else', function () {
            address.set({
                country: new C.Country({code: 'DE'}),
                type: C.Address.ADDRESS_TYPES.PACKSTATION
            });

            expect(address.$.type).to.be.eql(C.Address.ADDRESS_TYPES.PACKSTATION);

            address.set('country', new C.Country({code: 'IE'}));

            expect(address.$.type).to.be.eql(C.Address.ADDRESS_TYPES.PRIVATE);
        });

    });

    describe('street', function () {

        it('should be only required when type is PRIVATE', function () {
            address.set({
                street: "", // empty street name
                country: new C.Country({code: 'DE'}),
                type: C.Address.ADDRESS_TYPES.PACKSTATION
            });

            address.validate({fields: ['street']});

            expect(address.isValid()).to.eql(true);

            address.set('type', C.Address.ADDRESS_TYPES.PRIVATE);

            address.validate({fields: ['street']});

            expect(address.isValid()).to.eql(false);
        });

        it('should not accept "Postfiliale" as value', function () {

            address.set({
                street: "Valid street name"
            });

            address.validate({fields: ["street"]});

            expect(address.isValid()).to.eql(true);

            address.set('street', 'postfiliale 123');

            address.validate({fields: ["street"]});

            expect(address.isValid()).to.eql(false);
        });

        it('should not accept "packstation" or "postnummer" ', function () {
            address.set({
                street: "Valid street name"
            });

            address.validate({fields: ["street"]});

            expect(address.isValid()).to.eql(true);

            address.set('street', 'packstation 123');

            address.validate({fields: ["street"]});

            expect(address.isValid()).to.eql(false);

            address.set('street', 'postnummer 123');

            address.validate({fields: ["street"]});

            expect(address.isValid()).to.eql(false);

        });

    });

    describe('state', function () {

        it('should be only required for US', function () {
            address.set({
                state: "", // empty state name
                country: new C.Country({code: 'DE'})
            });

            address.validate({fields: ['state']});

            expect(address.isValid()).to.eql(true);

            address.set('country', new C.Country({code: 'US'}));

            address.validate({fields: ['state']});

            expect(address.isValid()).to.eql(false);

            address.set('country', new C.Country({code: 'IE'}));

            address.validate({fields: ['state']});

            expect(address.isValid()).to.eql(true);
        });

    });

    describe('zipCode', function () {

        it('should be not required for IE', function () {
            address.set({
                zipCode: "", // empty zipCode name
                country: new C.Country({code: 'DE'})
            });

            address.validate({fields: ['zipCode']});

            expect(address.isValid()).to.eql(false);

            address.set('country', new C.Country({code: 'IE'}));

            address.validate({fields: ['zipCode']});

            expect(address.isValid()).to.eql(true);
        });


    });

    describe('postNr', function () {

        it('should be required for address type PACKSTATION', function () {
            address.set({
                postNr: "", // empty street name
                country: new C.Country({code: 'DE'}),
                type: C.Address.ADDRESS_TYPES.PACKSTATION
            });

            address.validate({fields: ['postNr']});

            expect(address.isValid()).to.eql(false);

            address.set('type', C.Address.ADDRESS_TYPES.PRIVATE);

            address.validate({fields: ['postNr']});

            expect(address.isValid()).to.eql(true);
        })

    });

    describe('packStationNr', function () {

        it('should be required for address type PACKSTATION', function () {
            address.set({
                packStationNr: "", // empty street name
                country: new C.Country({code: 'DE'}),
                type: C.Address.ADDRESS_TYPES.PACKSTATION
            });

            address.validate({fields: ['packStationNr']});

            expect(address.isValid()).to.eql(false);

            address.set('type', C.Address.ADDRESS_TYPES.PRIVATE);

            address.validate({fields: ['packStationNr']});

            expect(address.isValid()).to.eql(true);
        })

    });

    describe('company', function () {

        it('should be required for salutation 4 (Company)', function () {
            address.set({
                company: "", // empty company
                person: new C.Person({firstName: 'Peter', lastName: 'Pan', salutation: "4"})
            });

            address.validate({fields: ['company']});

            expect(address.isValid()).to.eql(false);

            address.$.person.set('salutation', "1");

            address.validate({fields: ['company']});

            expect(address.isValid()).to.eql(true);
        })

    });


});
