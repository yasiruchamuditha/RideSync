const chai = require('chai');
const chaiHttp = require('chai-http'); // CommonJS
const server = require('../app.js');
const Bus = require('../models/Bus.js');
const { expect } = chai;

chai.use(chaiHttp);


describe('Bus API Tests', () => {
  beforeEach(async () => {
    // Clear the database or set up mock data before each test
    await Bus.deleteMany({});
  });

  it('should create a new bus', (done) => {
    const busData = {
      ntcRegistrationNumber: 'NTC12345BUS',
      conductorNtcRegistrationNumber: 'NTC67890COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-1234',
      capacity: 50,
      route: 'Colombo-Kandy',
      routeNo: 'A1',
    };

    chai
      .request(server)
      .post('/api/buses')
      .send(busData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Bus created successfully');
        expect(res.body.bus).to.include(busData);
        done();
      });
  });

  it('should get all buses', (done) => {
    const bus1 = new Bus({
      ntcRegistrationNumber: 'NTC12345BUS',
      conductorNtcRegistrationNumber: 'NTC67890COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-1234',
      capacity: 50,
      route: 'Colombo-Kandy',
      routeNo: 'A1',
    });

    const bus2 = new Bus({
      ntcRegistrationNumber: 'NTC67890BUS',
      conductorNtcRegistrationNumber: 'NTC12345COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-5678',
      capacity: 40,
      route: 'Galle-Colombo',
      routeNo: 'A2',
    });

    bus1.save();
    bus2.save();

    chai
      .request(server)
      .get('/api/buses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        done();
      });
  });

  it('should get a bus by ID', (done) => {
    const bus = new Bus({
      ntcRegistrationNumber: 'NTC12345BUS',
      conductorNtcRegistrationNumber: 'NTC67890COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-1234',
      capacity: 50,
      route: 'Colombo-Kandy',
      routeNo: 'A1',
    });

    bus.save((err, savedBus) => {
      chai
        .request(server)
        .get(`/api/buses/${savedBus._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.ntcRegistrationNumber).to.equal('NTC12345BUS');
          done();
        });
    });
  });

  it('should update a bus by ID', (done) => {
    const bus = new Bus({
      ntcRegistrationNumber: 'NTC12345BUS',
      conductorNtcRegistrationNumber: 'NTC67890COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-1234',
      capacity: 50,
      route: 'Colombo-Kandy',
      routeNo: 'A1',
    });

    bus.save((err, savedBus) => {
      chai
        .request(server)
        .put(`/api/buses/${savedBus._id}`)
        .send({ capacity: 55 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Bus updated successfully');
          expect(res.body.bus.capacity).to.equal(55);
          done();
        });
    });
  });

  it('should delete a bus by ID', (done) => {
    const bus = new Bus({
      ntcRegistrationNumber: 'NTC12345BUS',
      conductorNtcRegistrationNumber: 'NTC67890COND',
      driverNtcRegistrationNumber: 'NTC54321DRVR',
      busNumber: 'AB-1234',
      capacity: 50,
      route: 'Colombo-Kandy',
      routeNo: 'A1',
    });

    bus.save((err, savedBus) => {
      chai
        .request(server)
        .delete(`/api/buses/${savedBus._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Bus deleted successfully');
          done();
        });
    });
  });
});
