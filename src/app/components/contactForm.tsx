import { useState } from "react";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Use environment variable for API key
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY ;
    if (!accessKey) {
      console.error("Missing Web3Forms Access Key in environment variables.");
      setErrorMessage("Missing access key. Please contact support.");
      return;
    }

    formData.append("access_key", accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Message sent successfully!");
        setErrorMessage(null);
        console.log(result);
      } else {
        setErrorMessage("Failed to send message.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen text-white px-6">
      {/* Left Side - Contact Info */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
        <p className="text-gray-400">
          If you have any inquiries, please feel free to reach out. You can contact me via email at <br />
          <a href="mailto:ka46774336@gmail.com" className="text-blue-400 hover:underline">
            ka46774336@gmail.com
          </a>
        </p>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-2/3  p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-3 border border-gray-600 rounded bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              required
              className="w-full p-3 border border-gray-600 rounded bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-600 rounded bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <textarea
            name="message"
            placeholder="Message"
            required
            className="w-full p-3 border border-gray-600 rounded bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <button
            type="submit"
            className="w-full p-3 mt-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Submit
          </button>

          {successMessage && <p className="text-green-400 mt-3 text-center">{successMessage}</p>}
          {errorMessage && <p className="text-red-400 mt-3 text-center">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
