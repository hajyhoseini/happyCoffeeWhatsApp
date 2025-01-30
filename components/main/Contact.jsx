// components/Contact.js
const Contact = () => (
    <section id="contact" className="bg-black/60 relative w-full text-white py-16 px-10">
<h3 className="text-4xl font-extrabold text-center mb-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-lg backdrop-blur-md border-2 border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
  تماس با من
</h3>
      <form className="max-w-md mx-auto">
        <input type="text" placeholder="نام شما" className="w-full px-4 py-2 mb-4 rounded-lg" />
        <input type="email" placeholder="ایمیل شما" className="w-full px-4 py-2 mb-4 rounded-lg" />
        <textarea placeholder="پیام شما" rows="4" className="w-full px-4 py-2 mb-4 rounded-lg"></textarea>
        <button type="submit" className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-2xl">
  ارسال
</button>


      </form>
    </section>
  );
  
  export default Contact;
  