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
      className="py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${getAssetPath("Images/Background01.png")}')` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer feedback</h2>
          <p className="text-muted-foreground text-lg">
            What have our clients shared about our services?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 gap-y-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-3xl p-6 md:p-8 pt-12 md:pt-8 shadow-card hover:shadow-lg transition-shadow relative"
            >
              {/* Avatar - overlapping on mobile */}
              <div className="md:hidden absolute -top-10 left-1/2 -translate-x-1/2">
                <img
                  src={getAssetPath(testimonial.image)}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-card"
                />
              </div>

              {/* Quote Icons */}
              <img
                src={getAssetPath("Images/Feedback_Icon.webp")}
                alt="Quote"
                className="absolute top-6 left-6 w-6 md:w-8 h-6 md:h-8 opacity-30"
              />
              <img
                src={getAssetPath("Images/Feedback_Icon.webp")}
                alt="Quote"
                className="absolute bottom-6 right-6 w-6 md:w-8 h-6 md:h-8 opacity-30 rotate-180"
              />

              {/* Author - Desktop horizontal layout */}
              <div className="hidden md:flex items-center gap-4 mb-6">
                <img
                  src={getAssetPath(testimonial.image)}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                </div>
              </div>

              {/* Author - Mobile centered layout */}
              <div className="md:hidden text-center mb-4">
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <span className="text-sm text-muted-foreground">{testimonial.role}</span>
              </div>

              <h5 className="font-bold text-primary mb-2 uppercase text-sm md:text-base md:normal-case text-center md:text-left">{testimonial.title}</h5>
              <p className="text-muted-foreground italic md:not-italic text-center md:text-left text-sm md:text-base">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
