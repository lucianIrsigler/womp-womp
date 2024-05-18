const { Applicant } = require("../../../models");
const { getApplicants } = require("../../../controllers/getControllers/getUsersController");

jest.mock("../../../models/Applicant");

const { FundingManager } = require("../../../models");
const { getFundingManagers } = require("../../../controllers/getControllers/getUsersController");

jest.mock("../../../models", () => ({
  FundingManager: {
    find: jest.fn(),
  },
}));

describe("Testing getFundingManagers controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all funding managers if no query parameters are provided", async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, name: "Manager 1" },
      { id: 2, name: "Manager 2" },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFundingManagers);
  });

  it("should filter funding managers based on query parameters", async () => {
    const req = {
      query: {
        name: "Manager 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, name: "Manager 1" },
      { id: 2, name: "Manager 2" },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Manager 1" }]);
  });

  it("should filter funding managers based on nested query parameters", async () => {
    const req = {
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, nested: { property: "value" } },
      { id: 2, nested: { property: "otherValue" } },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nested: { property: "value" } }]);
  });
});