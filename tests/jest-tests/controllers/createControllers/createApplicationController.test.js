const request = require("supertest");
const app = require("../../../../app"); // Assuming you have an Express app setup

describe("createApplicationController", () => {
    it("should return 400 if required fields are missing", async () => {
        const response = await request(app)
            .post("/create-application")
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Please ensure you have entered the Applicant Email, Funding Opportunity ID, Reason, and Contact Number.",
            status: 400,
        });
    });

    it("should return 409 if duplicate application exists", async () => {
        // Assuming you have a test database setup with a duplicate application
        const response = await request(app)
            .post("/create-application")
            .send({
                applicant_email: "test@example.com",
                funding_opportunity_id: "123",
                reason: "Test reason",
                contact_number: "123456789",
            });

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
            message: "This application by: 'test@example.com' already exists",
            status: 409,
        });
    });

    it("should return 201 if application is successfully created", async () => {
        const response = await request(app)
            .post("/create-application")
            .send({
                applicant_email: "test@example.com",
                funding_opportunity_id: "123",
                reason: "Test reason",
                contact_number: "123456789",
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: "Application successfully submitted.",
            status: 201,
        });
    });
});