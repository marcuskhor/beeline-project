import { getAssetPath } from "@/lib/assets";

const testimonials = [
  {
    id: 1,
    name: "Lorem Ipsum",
    role: "CEO, Example Co.",
    title: "Effective Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet quam non neque scelerisque finibus.",
    image: "Images/Feedback_Customer01.png",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Marketing Director",
    title: "Creative Solutions",
    content: "Their creative approach helped us stand out in a crowded market. Highly recommended!",
    image: "Images/Feedback_Customer02.png",
  },
  {
    id: 3,
    name: "Jane Smith",
    role: "Founder, StartupXYZ",
    title: "Professional Team",
    content: "Working with Beeline was a game-changer for our brand identity.",
    image: "Images/Feedback_Customer03.png",
  },
];

export const FeedbackSection = () => {
  return (
    <section 
      className="py-20 md:py-[120px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${getAssetPath("Images/Background01.png")}')` }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-[3.2rem] font-extrabold mb-2 md:mb-4">Customer feedback</h2>
          <p className="text-text-brown text-sm md:text-2xl font-semibold italic">
            What have our clients shared about our services?
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-20 md:gap-y-24 lg:gap-8 mt-20 md:mt-28 max-w-[350px] md:max-w-none mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[30px] md:rounded-[50px] p-8 pt-12 md:p-[60px] md:pt-[60px] shadow-[0_4px_8px_rgba(0,0,0,0.08),0_15px_20px_rgba(0,0,0,0.1)] relative text-center w-[85%] md:w-full mx-auto"
            >
              {/* Avatar - overlapping top */}
              <img
                src={getAssetPath(testimonial.image)}
                alt={testimonial.name}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full object-cover border-[5px] md:border-[10px] border-white bg-[#ffecd3] p-1 absolute -top-[50px] md:-top-[65px] left-1/2 -translate-x-1/2 z-10"
              />

              {/* Quote Icons */}
              <img
                src={getAssetPath("Images/Feedback_Icon.webp")}
                alt="Quote"
                className="absolute w-4 md:w-[25px] top-[140px] md:top-[210px] left-5 md:left-[30px] z-[1] animate-[quote-wiggle_2.5s_ease-in-out_infinite_alternate]"
              />
              <img
                src={getAssetPath("Images/Feedback_Icon.webp")}
                alt="Unquote"
                className="absolute w-4 md:w-[25px] bottom-10 md:top-[300px] right-5 md:right-[30px] z-[1] animate-[quote-wiggle-rotated_2.5s_ease-in-out_infinite_alternate]"
              />

              {/* Title */}
              <h5 className="text-[0.65rem] md:text-[0.8rem] font-bold text-black uppercase mt-8 md:mt-12 tracking-wider">
                {testimonial.title}
              </h5>

              {/* Quote Text */}
              <p className="text-[0.65rem] md:text-[0.8rem] italic text-text-light leading-[1.2rem] my-4 md:my-5 mx-6 md:mx-0">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="mt-6 md:mt-8">
                <h4 className="text-base md:text-xl font-extrabold text-text-brown m-0">{testimonial.name}</h4>
                <span className="text-xs md:text-sm font-semibold text-text-brown">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
