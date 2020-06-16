const LOGIN = "login/START_LOGIN" as const;

export const login = (userId: string) => ({
  type: LOGIN,
  payload: userId,
});

type LoginAction = ReturnType<typeof login>;

type LoginState = {
  userId: string;
};

const initialState: LoginState = {
  userId: "",
};

function reducer(state: LoginState = initialState, action: LoginAction) {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export default reducer;
