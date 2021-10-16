const app = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);



describe('/POST dish', () => {
    it("it should POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ idCode: "3", name: "Margherita", price: "16" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Successfully added a new dish");
                done();
            });
    });

});


describe('/POST dish without idCode', () => {
    it("it should not POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ name: "Sweet Tea", price: "16" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The dish could not be added");
                done();
            });
    });

});


describe('/POST dish without name', () => {
    it("it should not POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ idCode: "7", price: "16" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The dish could not be added");
                done();
            });
    });

});


describe('/POST dish without price', () => {
    it("it should not POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ idCode: "5", name: "Chocolate Cake" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The dish could not be added");
                done();
            });
    });

});


describe('/POST dish with idCode that is already on the menu', () => {
    it("it should not POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ idCode: "3", name: "Strawberry Banana Smoothie", price: "4" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The dish could not be added");
                done();
            });
    });

});


describe('/POST dish with name that is already on the menu', () => {
    it("it should not POST a new dish", done => {
        chai
            .request(app)
            .post("/dishes")
            .send({ idCode: "6", name: "Margherita", price: "4" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The dish could not be added");
                done();
            });
    });

});


describe('/POST order', () => {
    it("it should POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3
            ],
            date: "10/16/2021",
            name: "tom",
            familyName: "hardy",
            phone: "240240",
            adress: "los angeles 424"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Successfully added a new order");
                done();
            });
    });

});


describe('/POST order with orderCode that is already exists', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3
            ],
            date: "10/14/2021",
            name: "bob",
            familyName: "marley",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order without orderCode', () => {
    it("it should not POST a new order", done => {
        let order = {
            shoppingCart: [
                3
            ],
            date: "10/14/2021",
            name: "bob",
            familyName: "marley",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order dish that is not on the menu', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            date: "10/14/2021",
            name: "bob",
            familyName: "marley",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order without date', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            name: "bob",
            familyName: "marley",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order without name', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            date: "10/14/2021",
            familyName: "marley",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order without familyName', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            date: "10/14/2021",
            name: "bob",
            phone: "15351",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});

describe('/POST order without phone', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            date: "10/14/2021",
            name: "bob",
            familyName: "marley",
            adress: "jamaica 5846"
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe('/POST order without adress', () => {
    it("it should not POST a new order", done => {
        let order = {
            orderCode: "32",
            shoppingCart: [
                3, 7
            ],
            date: "10/14/2021",
            name: "bob",
            familyName: "marley",
            phone: "15351",
        }
        chai
            .request(app)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("The order could not be added");
                done();
            });
    });

});


describe("/GET orders", () => {
    it("it should GET all the orders", done => {
        chai
            .request(app)
            .get("/orders")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});


describe("/GET orders form last day", () => {
    it("it should GET all the orders from last day", done => {
        chai
            .request(app)
            .get("/orders/lastDay")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});
