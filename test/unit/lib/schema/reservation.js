const chai = require("chai");
const should = chai.should();
const Reservation = require("../../../../lib/schema/reservation");

describe("Reservation", function () {
  context("Data and time combination", function () {
    it("should return a ISO data & time with valid input", function () {
      const date = "2020/08/13";
      const time = "06:02 AM";

      Reservation.combineDateTime(date, time).should.equal(
        "2020-08-13T06:02:00.000Z"
      );
    });

    it("should return null on a bad date & time", function () {
      const date = "dmops";
      const time = "fail";

      should.not.exist(Reservation.combineDateTime(date, time));
    });
  });

  context("Validator", function () {
    it("should pass a valid reser", function (done) {
      const reservation = new Reservation({
        date: "2020/08/08",
        time: "06:02 AM",
        party: 4,
        name: "Family",
        email: "email@email.com",
      });

      reservation.validator(function (error, value) {
        value.should.deep.equal(reservation);
        done(error);
      });
    });

    it("should fail a resev with bad email", function (done) {
      const reservation = new Reservation({
        date: "2020/08/08",
        time: "06:02 AM",
        party: 4,
        name: "Family",
        email: "notValid",
      });

      reservation.validator(function (error) {
        error.should.be.an("error").and.not.be.null;
        done();
      });
    });
  });
});
