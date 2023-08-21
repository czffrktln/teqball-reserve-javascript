export const Login = () => {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=190590552645-svjo78cho19kki5hsvoh0m09irugra96.apps.googleusercontent.com&redirect_uri=http%3A//localhost%3A5173/finishlogin&scope=openid%20email%20profile%20https%3A//www.googleapis.com/auth/calendar&response_type=code&prompt=consent`;

  return (
    <div>
      <div className="middle">
        <h1>LOGIN</h1>
        <a href={link}>
          <button>Log in with Google</button>
        </a>
      </div>
    </div>
  );
};
