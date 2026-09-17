import { Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  product: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The quality of Nariyal Co. coconut oil is outstanding! I\'ve been using it for both cooking and skincare, and the results are amazing. Highly recommended!',
    product: 'Virgin Coconut Oil',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Fresh, natural, and delivered quickly. The coconut water tastes incredible and is a perfect post-workout drink. Will definitely order again!',
    product: 'Fresh Coconut Water',
  },
  {
    id: '3',
    name: 'Emma Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'I love everything about Nariyal Co.! From their customer service to the premium packaging, it\'s clear they care about quality. The coconut flour is perfect for my baking!',
    product: 'Coconut Flour',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
            What Customers Are Saying
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Nariyal Co. for premium coconut products
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 stagger">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-base card-hover p-6 space-y-4 animate-fade-in"
            >
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-sage-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-forest-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
