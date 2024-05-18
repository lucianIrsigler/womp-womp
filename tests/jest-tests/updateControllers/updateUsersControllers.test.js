const { updateFundingManagers } = require("../../../controllers/updateControllers/updateUsersController");

// Mocking FundingManager and User modules
jest.mock("../../../controllers/updateControllers/updateUsersController", () => {
  const originalModule = jest.requireActual("../../../controllers/updateControllers/updateUsersController");
  return {
    ...originalModule,
    FundingManager: {
      findOne: jest.fn().mockResolvedValue({ account_details: { balance: 100 } }),
      updateOne: jest.fn(),
    },
    User: {
      updateOne: jest.fn(),
    },
  };
});

describe("Testing the updateFundingManagers function", () => {
  it("should return a 400 status code and error message if email is not provided", async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await updateFundingManagers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include email in url. e.g: api/v1/funding-manager/example@gmail.com", status: 400 });
  });

  it("should return a 400 status code and error message if body is empty", async () => {
    const req = { params: { email: "example@gmail.com" }, body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await updateFundingManagers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include a body of the properties you want to modify", status: 400 });
  });

  /*it("should update the funding manager and user with the provided body", async () => {
    const req = { params: { email: "fund@gmail.com" }, body: { name: "John Doe" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await updateFundingManagers(req, res);

    expect(FundingManager.updateOne).toHaveBeenCalledWith({ email: "example@gmail.com" }, { $set: { name: "John Doe" } });
    expect(User.updateOne).toHaveBeenCalledWith({ email: "example@gmail.com" }, { $set: { name: "John Doe" } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "successfully updated", success: true, data: { name: "John Doe" } });
  });*/
});
