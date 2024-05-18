const { Applicant } = require("../../../models");
const { getApplicants } = require("../../../controllers/getControllers/getUsersController");

jest.mock("../../../models", () => ({
  Applicant: {
    find: jest.fn(),
  },
}));

describe("Testing getApplicants controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all applicants if no query parameters are provided", async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplicants = [{ id: 1, name: "Applicant 1" }, { id: 2, name: "Applicant 2" }];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockApplicants);
  });

  it("should filter applicants based on query parameters", async () => {
    const req = {
      query: {
        name: "Applicant 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockApplicants = [
      { id: 1, name: "Applicant 1" },
      { id: 2, name: "Applicant 2" },
    ];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Applicant 1" }]);
  });

  it("should filter applicants based on nested query parameters", async () => {
    const req = {
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplicants = [
      { id: 1, nested: { property: "value" } },
      { id: 2, nested: { property: "otherValue" } },
    ];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nested: { property: "value" } }]);
  });
});