alert("SkillLink JS LOADED");
// ============================================================
// SKILLLINK - FRONTEND JAVASCRIPT
// PART 1
// ============================================================


// =========================
// SUPABASE CONFIGURATION
// =========================

const SUPABASE_URL =
  "https://acobkbtjgurifqynotqz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_BIl-VeFFgUtHzEqBZFEa9A_SUZIz7yn";


// =========================
// SUPABASE CLIENT
// =========================

if (!window.supabase) {

  console.error(
    "Supabase library was not loaded."
  );

} else {

  const {
    createClient
  } = window.supabase;

  const supabase =
    createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );


  // Make Supabase available to the
  // rest of this script.

  window.skillLinkSupabase =
    supabase;


  console.log(
    "SkillLink Supabase connected."
  );


  // =========================
  // DOM READY
  // =========================

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      console.log(
        "SkillLink frontend loaded."
      );

      setupNavigation();

      setupAuthButtons();

      setupCourseButtons();

      setupPackageButtons();

      setupProjectButtons();

      checkCurrentUser();

    }
  );


  // =========================
  // NAVIGATION
  // =========================

  function setupNavigation() {

    const links =
      document.querySelectorAll(
        ".nav-links a"
      );

    links.forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          console.log(
            "Navigation:",
            link.textContent.trim()
          );

        }
      );

    });

  }


  // =========================
  // AUTH BUTTON SETUP
  // =========================

  function setupAuthButtons() {

    const loginButtons =
      document.querySelectorAll(
        ".login-button"
      );

    const signupButtons =
      document.querySelectorAll(
        ".signup-button"
      );


    // LOGIN BUTTONS

    loginButtons.forEach((button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          openAuthModal("login");

        }
      );

    });


    // SIGNUP BUTTONS

    signupButtons.forEach((button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          openAuthModal("signup");

        }
      );

    });

  }


  // =========================
  // COURSE BUTTONS
  // =========================

  function setupCourseButtons() {

    const buttons =
      document.querySelectorAll(
        ".course-button"
      );

    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          showNotification(
            "Course details will be available soon."
          );

        }
      );

    });

  }


  // =========================
  // PACKAGE BUTTONS
  // =========================

  function setupPackageButtons() {

    const buttons =
      document.querySelectorAll(
        ".package-button"
      );

    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          openAuthModal("signup");

        }
      );

    });

  }


  // =========================
  // PROJECT BUTTONS
  // =========================

  function setupProjectButtons() {

    const buttons =
      document.querySelectorAll(
        ".project-button"
      );

    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          openAuthModal("login");

        }
      );

    });

  }


  // =========================
  // AUTH MODAL
  // =========================

  function openAuthModal(mode = "login") {

    const existingModal =
      document.querySelector(
        ".auth-overlay"
      );

    if (existingModal) {

      existingModal.remove();

    }


    const isSignup =
      mode === "signup";


    const overlay =
      document.createElement("div");

    overlay.className =
      "auth-overlay";


    overlay.innerHTML = `

      <div class="auth-modal">

        <button
          type="button"
          class="auth-close"
          aria-label="Close"
        >
          ×
        </button>


        <h2>
          ${
            isSignup
              ? "Create Account"
              : "Welcome Back"
          }
        </h2>


        <p>
          ${
            isSignup
              ? "Create your SkillLink account"
              : "Login to your SkillLink account"
          }
        </p>


        <form
          id="authForm"
        >

          ${
            isSignup
              ? `

                <div class="auth-form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="authFullName"
                    placeholder="Enter your full name"
                    required
                  >

                </div>


                <div class="auth-form-group">

                  <label>
                    Username
                  </label>

                  <input
                    type="text"
                    id="authUsername"
                    placeholder="Choose username"
                    required
                  >

                </div>

              `
              : ""
          }


          <div class="auth-form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              id="authEmail"
              placeholder="Enter your email"
              required
            >

          </div>


          <div class="auth-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              id="authPassword"
              placeholder="Enter password"
              minlength="6"
              required
            >

          </div>


          <button
            type="submit"
            class="auth-submit"
            id="authSubmit"
          >
            ${
              isSignup
                ? "Create Account"
                : "Login"
            }
          </button>


          <div
            id="authMessage"
            class="auth-message"
          ></div>

        </form>


        <div class="auth-switch">

          ${
            isSignup
              ? `
                Already have an account?

                <button
                  type="button"
                  id="switchToLogin"
                >
                  Login
                </button>
              `
              : `
                Don't have an account?

                <button
                  type="button"
                  id="switchToSignup"
                >
                  Sign Up
                </button>
              `
          }

        </div>

      </div>

    `;


    document.body.appendChild(
      overlay
    );


    // CLOSE BUTTON

    const closeButton =
      overlay.querySelector(
        ".auth-close"
      );


    closeButton.addEventListener(
      "click",
      () => {

        overlay.remove();

      }
    );


    // CLICK OUTSIDE

    overlay.addEventListener(
      "click",
      (event) => {

        if (
          event.target === overlay
        ) {

          overlay.remove();

        }

      }
    );


    // SWITCH LOGIN

    const switchToLogin =
      overlay.querySelector(
        "#switchToLogin"
      );


    if (switchToLogin) {

      switchToLogin.addEventListener(
        "click",
        () => {

          openAuthModal("login");

        }
      );

    }


    // SWITCH SIGNUP

    const switchToSignup =
      overlay.querySelector(
        "#switchToSignup"
      );


    if (switchToSignup) {

      switchToSignup.addEventListener(
        "click",
        () => {

          openAuthModal("signup");

        }
      );

    }


    // FORM SUBMIT

    const authForm =
      overlay.querySelector(
        "#authForm"
      );


    authForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        if (isSignup) {

          await signupUser();

        } else {

          await loginUser();

        }

      }
    );

  }
    // =========================
  // SIGNUP
  // =========================

  async function signupUser() {

    const fullName =
      document.querySelector("#authFullName")
        ?.value.trim();

    const username =
      document.querySelector("#authUsername")
        ?.value.trim();

    const email =
      document.querySelector("#authEmail")
        ?.value.trim();

    const password =
      document.querySelector("#authPassword")
        ?.value;


    const message =
      document.querySelector("#authMessage");

    const submitButton =
      document.querySelector("#authSubmit");


    if (!fullName || !username || !email || !password) {

      showAuthMessage(
        "Please fill all fields.",
        "error"
      );

      return;

    }


    if (password.length < 6) {

      showAuthMessage(
        "Password must be at least 6 characters.",
        "error"
      );

      return;

    }


    setAuthLoading(
      submitButton,
      true,
      "Creating Account..."
    );


    try {

      const {
        data,
        error
      } = await supabase.auth.signUp({

        email: email,

        password: password,

        options: {

          data: {

            full_name: fullName,

            username: username

          }

        }

      });


      if (error) {

        throw error;

      }


      // Create profile when user is returned

      if (data && data.user) {

        await createProfile(
          data.user,
          fullName,
          username
        );

      }


      if (
        data &&
        data.user &&
        data.session
      ) {

        showAuthMessage(
          "Account created successfully!",
          "success"
        );


        setTimeout(() => {

          closeAuthModal();

          updateAuthUI(
            data.user
          );

        }, 1000);

      } else {

        showAuthMessage(
          "Account created. Please check your email for verification.",
          "success"
        );

      }


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );


      showAuthMessage(
        error.message ||
        "Signup failed. Please try again.",
        "error"
      );

    } finally {

      setAuthLoading(
        submitButton,
        false,
        "Create Account"
      );

    }

  }


  // =========================
  // LOGIN
  // =========================

  async function loginUser() {

    const email =
      document.querySelector("#authEmail")
        ?.value.trim();

    const password =
      document.querySelector("#authPassword")
        ?.value;


    const message =
      document.querySelector("#authMessage");

    const submitButton =
      document.querySelector("#authSubmit");


    if (!email || !password) {

      showAuthMessage(
        "Please enter email and password.",
        "error"
      );

      return;

    }


    setAuthLoading(
      submitButton,
      true,
      "Logging in..."
    );


    try {

      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({

        email: email,

        password: password

      });


      if (error) {

        throw error;

      }


      showAuthMessage(
        "Login successful!",
        "success"
      );


      setTimeout(() => {

        closeAuthModal();

        updateAuthUI(
          data.user
        );

      }, 700);


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      showAuthMessage(
        error.message ||
        "Login failed. Please check your details.",
        "error"
      );

    } finally {

      setAuthLoading(
        submitButton,
        false,
        "Login"
      );

    }

  }


  // =========================
  // CREATE USER PROFILE
  // =========================

  async function createProfile(
    user,
    fullName,
    username
  ) {

    if (!user) {

      return;

    }


    try {

      const {
        error
      } = await supabase
        .from("profiles")
        .insert({

          id: user.id,

          full_name: fullName,

          username: username,

          role: "user"

        });


      // Duplicate profile is okay

      if (
        error &&
        error.code !== "23505"
      ) {

        console.error(
          "Profile creation error:",
          error
        );

        showAuthMessage(
          "Account created, but profile could not be created.",
          "error"
        );

      }


    } catch (error) {

      console.error(
        "Profile error:",
        error
      );

    }

  }


  // =========================
  // AUTH MESSAGE
  // =========================

  function showAuthMessage(
    text,
    type = "normal"
  ) {

    const message =
      document.querySelector(
        "#authMessage"
      );


    if (!message) {

      return;

    }


    message.style.display =
      "block";

    message.textContent =
      text;


    if (type === "success") {

      message.style.color =
        "#86efac";

      message.style.background =
        "rgba(34,197,94,0.10)";

    } else if (type === "error") {

      message.style.color =
        "#fca5a5";

      message.style.background =
        "rgba(239,68,68,0.10)";

    } else {

      message.style.color =
        "#cbd5e1";

      message.style.background =
        "rgba(255,255,255,0.05)";

    }

  }


  // =========================
  // LOADING STATE
  // =========================

  function setAuthLoading(
    button,
    loading,
    text
  ) {

    if (!button) {

      return;

    }


    button.disabled =
      loading;


    if (loading) {

      button.textContent =
        text;

    } else {

      button.textContent =
        text;

    }

  }


  // =========================
  // CLOSE AUTH MODAL
  // =========================

  function closeAuthModal() {

    const modal =
      document.querySelector(
        ".auth-overlay"
      );


    if (modal) {

      modal.remove();

    }

  }


  // =========================
  // CURRENT USER
  // =========================

  async function checkCurrentUser() {

    try {

      const {
        data,
        error
      } = await supabase.auth.getUser();


      if (error) {

        console.error(
          "User check error:",
          error
        );

        return;

      }


      if (data && data.user) {

        updateAuthUI(
          data.user
        );

      }

    } catch (error) {

      console.error(
        "Current user error:",
        error
      );

    }

  }


  // =========================
  // UPDATE AUTH UI
  // =========================

  function updateAuthUI(
    user = null
  ) {

    const loginButtons =
      document.querySelectorAll(
        ".login-button"
      );

    const signupButtons =
      document.querySelectorAll(
        ".signup-button"
      );


    if (!user) {

      loginButtons.forEach(
        (button) => {

          button.textContent =
            "Login";

        }
      );


      signupButtons.forEach(
        (button) => {

          button.style.display =
            "";

        }
      );


      return;

    }


    loginButtons.forEach(
      (button) => {

        button.textContent =
          "Logout";


        button.onclick =
          async (event) => {

            event.preventDefault();

            await logoutUser();

          };

      }
    );


    signupButtons.forEach(
      (button) => {

        button.style.display =
          "none";

      }
    );

  }


  // =========================
  // LOGOUT
  // =========================

  async function logoutUser() {

    try {

      const {
        error
      } = await supabase.auth.signOut();


      if (error) {

        throw error;

      }


      window.location.reload();

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      alert(
        "Logout failed: " +
        error.message
      );

    }

  }


  // =========================
  // AUTH STATE LISTENER
  // =========================

  supabase.auth.onAuthStateChange(
    (event, session) => {

      console.log(
        "Auth state:",
        event
      );


      updateAuthUI(
        session?.user || null
      );

    }
  );

}
  // =========================
  // SIGNUP
  // =========================

  async function signupUser() {

    const fullName =
      document.querySelector("#authFullName")?.value.trim();

    const username =
      document.querySelector("#authUsername")?.value.trim();

    const email =
      document.querySelector("#authEmail")?.value.trim();

    const password =
      document.querySelector("#authPassword")?.value;


    const submitButton =
      document.querySelector("#authSubmit");


    if (!fullName || !username || !email || !password) {

      showAuthMessage(
        "Please fill all fields.",
        "error"
      );

      return;
    }


    if (password.length < 6) {

      showAuthMessage(
        "Password must be at least 6 characters.",
        "error"
      );

      return;
    }


    setAuthLoading(
      submitButton,
      true,
      "Creating Account..."
    );


    try {

      const {
        data,
        error
      } = await supabase.auth.signUp({

        email: email,

        password: password,

        options: {
          data: {
            full_name: fullName,
            username: username
          }
        }

      });


      if (error) {
        throw error;
      }


      if (data?.user) {

        await createProfile(
          data.user,
          fullName,
          username
        );

      }


      if (data?.session) {

        showAuthMessage(
          "Account created successfully!",
          "success"
        );


        setTimeout(() => {

          closeAuthModal();

          updateAuthUI(
            data.user
          );

        }, 1000);

      } else {

        showAuthMessage(
          "Account created. Please check your email for verification.",
          "success"
        );

      }


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      showAuthMessage(
        error.message ||
        "Signup failed.",
        "error"
      );

    } finally {

      setAuthLoading(
        submitButton,
        false,
        "Create Account"
      );

    }

  }


  // =========================
  // LOGIN
  // =========================

  async function loginUser() {

    const email =
      document.querySelector("#authEmail")?.value.trim();

    const password =
      document.querySelector("#authPassword")?.value;

    const submitButton =
      document.querySelector("#authSubmit");


    if (!email || !password) {

      showAuthMessage(
        "Please enter email and password.",
        "error"
      );

      return;
    }


    setAuthLoading(
      submitButton,
      true,
      "Logging in..."
    );


    try {

      const {
        data,
        error
      } =
        await supabase.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {
        throw error;
      }


      showAuthMessage(
        "Login successful!",
        "success"
      );


      setTimeout(() => {

        closeAuthModal();

        updateAuthUI(
          data.user
        );

      }, 700);


    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      showAuthMessage(
        error.message ||
        "Login failed
        "error"
      );

    } finally {

      setAuthLoading(
        submitButton,
        false,
        "Login"
      );

    }

  }


  // =========================
  // CREATE PROFILE
  // =========================

  async function createProfile(
    user,
    fullName,
    username
  ) {

    if (!user) {
      return;
    }


    const {
      error
    } =
      await supabase
        .from("profiles")
        .insert({

          id: user.id,

          full_name: fullName,

          username: username

        });


    if (
      error &&
      error.code !== "23505"
    ) {

      console.error(
        "Profile creation error:",
        error
      );

    }

  }


  // =========================
  // AUTH MESSAGE
  // =========================

  function showAuthMessage(
    text,
    type = "normal"
  ) {

    const message =
      document.querySelector(
        "#authMessage"
      );


    if (!message) {
      return;
    }


    message.style.display =
      "block";

    message.textContent =
      text;


    if (type === "success") {

      message.style.color =
        "#86efac";

      message.style.background =
        "rgba(34,197,94,0.10)";

    } else if (type === "error") {

      message.style.color =
        "#fca5a5";

      message.style.background =
        "rgba(239,68,68,0.10)";

    } else {

      message.style.color =
        "#cbd5e1";

    }

  }


  // =========================
  // LOADING
  // =========================

  function setAuthLoading(
    button,
    loading,
    text
  ) {

    if (!button) {
      return;
    }


    button.disabled =
      loading;

    button.textContent =
      text;

  }


  // =========================
  // CLOSE MODAL
  // =========================

  function closeAuthModal() {

    const modal =
      document.querySelector(
        ".auth-overlay"
      );


    if (modal) {
      modal.remove();
    }

  }


  // =========================
  // CHECK CURRENT USER
  // =========================

  async function checkCurrentUser() {

    try {

      const {
        data,
        error
      } =
        await supabase.auth.getUser();


      if (error) {

        console.error(
          "User check error:",
          error
        );

        return;
      }


      if (data?.user) {

        updateAuthUI(
          data.user
        );

      }

    } catch (error) {

      console.error(
        "Current user error:",
        error
      );

    }

  }


  // =========================
  // UPDATE AUTH UI
  // =========================

  function updateAuthUI(
    user = null
  ) {

    const loginButtons =
      document.querySelectorAll(
        ".login-button"
      );

    const signupButtons =
      document.querySelectorAll(
        ".signup-button"
      );


    if (!user) {

      loginButtons.forEach(
        (button) => {

          button.textContent =
            "Login";

        }
      );


      signupButtons.forEach(
        (button) => {

          button.style.display =
            "";

        }
      );


      return;
    }


    loginButtons.forEach(
      (button) => {

        button.textContent =
          "Logout";


        button.onclick =
          async (event) => {

            event.preventDefault();

            await logoutUser();

          };

      }
    );


    signupButtons.forEach(
      (button) => {

        button.style.display =
          "none";

      }
    );

  }


  // =========================
  // LOGOUT
  // =========================

  async function logoutUser() {

    try {

      const {
        error
      } =
        await supabase.auth.signOut();


      if (error) {
        throw error;
      }


      window.location.reload();


    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      alert(
        "Logout failed: " +
        error.message
      );

    }

  }


  // =========================
  // AUTH STATE
  // =========================

  supabase.auth.onAuthStateChange(
    (event, session) => {

      console.log(
        "Auth state:",
        event
      );


      updateAuthUI(
        session?.user || null
      );

    }
  );

    }
