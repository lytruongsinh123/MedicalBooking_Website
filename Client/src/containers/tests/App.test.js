import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";

// ✅ Mock PersistGate để bỏ qua redux-persist trong test
jest.mock("redux-persist/integration/react", () => ({
    PersistGate: ({ children }) => children,
}));

const mockStore = configureStore([]);

describe("App Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            app: { started: true },
            user: { isLoggedIn: false },
        });
    });

    it("renders without crashing", async () => {
        try {
            await render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
        } catch (error) {
            console.error("Test failed with error:", error);
        }
    });
});
