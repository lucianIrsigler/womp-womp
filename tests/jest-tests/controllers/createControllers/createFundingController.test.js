const request = require("supertest");
const app = require("../../../../app"); // Assuming this is your Express app

describe("createFundingController", () => {
    it("should return 400 if required fields are missing", async () => {
        const response = await request(app)
            .post("/api/funding")
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Please ensure you have entered the Title, Company Name, Funding Manager Email and Type",
            status: 400,
        });
    });

    it("should return 409 if funding opportunity already exists", async () => {
        // Assuming you have a duplicate funding opportunity in your database
        const duplicateFundingOpportunity = {
            title: "Duplicate Funding Opportunity",
            // Other fields...
        };

        await FundingOpportunity.create(duplicateFundingOpportunity);

        const response = await request(app)
            .post("/api/funding")
            .send({
                title: duplicateFundingOpportunity.title,
                // Other fields...
            });

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
            message: `The Funding Opportunity: '${duplicateFundingOpportunity.title}' already exists`,
            status: 409,
        });
    });

    it("should create a new funding opportunity and return 201", async () => {
        const newFundingOpportunity = {
            title: "New Funding Opportunity",
            // Other fields...
        };

        const response = await request(app)
            .post("/api/funding")
            .send(newFundingOpportunity);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: `${newFundingOpportunity.title} has been successfully created.`,
            status: 201,
        });

        // Verify that the new funding opportunity is created in the database
        const createdFundingOpportunity = await FundingOpportunity.findOne({ title: newFundingOpportunity.title }).exec();
        expect(createdFundingOpportunity).toBeTruthy();
        expect(createdFundingOpportunity.title).toBe(newFundingOpportunity.title);
        // Verify other fields...
    });
});