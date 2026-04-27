const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("./models/Recipe");
const User = require("./models/User");

dotenv.config();

const recipes = [
  // ── CHICKEN ──────────────────────────────────────────────────────────────
  {
    title: "Classic Jollof Rice",
    description:
      "Smoky, spiced Nigerian party jollof rice cooked low and slow for maximum flavour. A staple at every celebration.",
    instructions:
      "Step 1: Blend tomatoes, red peppers, and scotch bonnet into a smooth paste.\nStep 2: Heat oil in a large pot and fry the blended paste for 20 minutes until the rawness cooks out.\nStep 3: Add tomato paste, chicken stock, bay leaves, thyme, curry powder, and seasoning cubes.\nStep 4: Stir in the washed rice and mix well to coat every grain.\nStep 5: Cover tightly, reduce heat to low, and steam for 30 minutes.\nStep 6: Stir once from the bottom, cover again and cook for another 15 minutes until rice is tender and slightly smoky.",
    ingredients: [
      { name: "Long grain parboiled rice", quantity: "3 cups" },
      { name: "Plum tomatoes", quantity: "4 large" },
      { name: "Red bell peppers", quantity: "2" },
      { name: "Scotch bonnet pepper", quantity: "1" },
      { name: "Tomato paste", quantity: "2 tbsp" },
      { name: "Chicken stock", quantity: "3 cups" },
      { name: "Vegetable oil", quantity: "4 tbsp" },
      { name: "Thyme", quantity: "1 tsp" },
      { name: "Curry powder", quantity: "1 tsp" },
      { name: "Bay leaves", quantity: "2" },
      { name: "Salt", quantity: "to taste" },
    ],
    category: "Chicken",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
    prepTime: 20,
    cookTime: 65,
    servings: 6,
    difficulty: "Medium",
    tags: ["nigerian", "rice", "party food", "african"],
  },
  {
    title: "Thai Green Curry",
    description:
      "An aromatic and creamy Thai green curry loaded with tender chicken, bamboo shoots, and fresh herbs in a rich coconut milk broth.",
    instructions:
      "Step 1: Heat oil in a wok over medium-high heat. Fry green curry paste for 2 minutes until fragrant.\nStep 2: Pour in coconut milk and bring to a gentle simmer.\nStep 3: Add chicken pieces and cook for 10 minutes until cooked through.\nStep 4: Add bamboo shoots, fish sauce, palm sugar and lime leaves. Simmer 5 more minutes.\nStep 5: Stir in Thai basil and green chillies.\nStep 6: Serve immediately over jasmine rice.",
    ingredients: [
      { name: "Chicken breast", quantity: "500g, sliced" },
      { name: "Green curry paste", quantity: "3 tbsp" },
      { name: "Coconut milk", quantity: "400ml tin" },
      { name: "Bamboo shoots", quantity: "200g tin" },
      { name: "Fish sauce", quantity: "2 tbsp" },
      { name: "Palm sugar", quantity: "1 tbsp" },
      { name: "Kaffir lime leaves", quantity: "4" },
      { name: "Thai basil", quantity: "large handful" },
      { name: "Green chillies", quantity: "2" },
      { name: "Vegetable oil", quantity: "2 tbsp" },
    ],
    category: "Chicken",
    area: "Thai",
    imageUrl:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    tags: ["thai", "curry", "coconut", "spicy", "asian"],
  },

  // ── BEEF ─────────────────────────────────────────────────────────────────
  {
    title: "Beef Bolognese",
    description:
      "A rich, slow-simmered Italian meat sauce with ground beef, San Marzano tomatoes, and a splash of red wine. Best made the day before.",
    instructions:
      "Step 1: Finely dice onion, carrot, and celery. Cook slowly in olive oil for 15 minutes.\nStep 2: Add minced beef and cook over high heat, breaking it up, until browned all over.\nStep 3: Pour in red wine and cook until fully evaporated.\nStep 4: Add crushed tomatoes, tomato paste, bay leaves, and a pinch of nutmeg.\nStep 5: Reduce heat to the lowest setting, cover partially, and cook for at least 2 hours.\nStep 6: Toss with tagliatelle and finish with Parmesan.",
    ingredients: [
      { name: "Minced beef", quantity: "500g" },
      { name: "Onion", quantity: "1 large" },
      { name: "Carrot", quantity: "1 large" },
      { name: "Celery stalk", quantity: "2" },
      { name: "Red wine", quantity: "200ml" },
      { name: "San Marzano tomatoes", quantity: "400g tin" },
      { name: "Tomato paste", quantity: "2 tbsp" },
      { name: "Bay leaves", quantity: "2" },
      { name: "Tagliatelle", quantity: "400g" },
      { name: "Parmesan", quantity: "to serve" },
      { name: "Olive oil", quantity: "3 tbsp" },
    ],
    category: "Beef",
    area: "Italian",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    prepTime: 20,
    cookTime: 130,
    servings: 6,
    difficulty: "Medium",
    tags: ["italian", "pasta", "beef", "slow cook", "comfort food"],
  },
  {
    title: "Suya Skewers",
    description:
      "West African spiced beef skewers marinated in a peanut-based spice mix and grilled over high heat. Street food at its finest.",
    instructions:
      "Step 1: Make the suya spice by blending groundnuts with ginger powder, paprika, garlic powder, onion powder, cayenne, and salt.\nStep 2: Slice beef sirloin thinly against the grain.\nStep 3: Coat beef strips in the spice mix and oil. Marinate for at least 2 hours.\nStep 4: Thread onto pre-soaked wooden skewers.\nStep 5: Grill over the highest heat for 3-4 minutes each side until slightly charred.\nStep 6: Serve with sliced onions, tomatoes, and extra suya spice.",
    ingredients: [
      { name: "Beef sirloin", quantity: "600g" },
      { name: "Roasted groundnuts", quantity: "100g" },
      { name: "Smoked paprika", quantity: "2 tsp" },
      { name: "Ginger powder", quantity: "1 tsp" },
      { name: "Garlic powder", quantity: "1 tsp" },
      { name: "Onion powder", quantity: "1 tsp" },
      { name: "Cayenne pepper", quantity: "1 tsp" },
      { name: "Vegetable oil", quantity: "2 tbsp" },
      { name: "Salt", quantity: "1 tsp" },
    ],
    category: "Beef",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
    prepTime: 120,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    tags: ["nigerian", "beef", "bbq", "african", "street food", "grilled"],
  },

  // ── SEAFOOD ───────────────────────────────────────────────────────────────
  {
    title: "Honey Garlic Salmon",
    description:
      "Tender salmon fillets glazed with a sweet and savory honey garlic sauce, pan-seared then finished in the oven.",
    instructions:
      "Step 1: Pat salmon fillets dry and season generously with salt and pepper.\nStep 2: Mix honey, soy sauce, minced garlic, lemon juice and chilli flakes.\nStep 3: Heat an oven-safe pan over high heat with a splash of oil until smoking.\nStep 4: Place salmon skin-side up and sear for 3 minutes without moving.\nStep 5: Flip, pour glaze over the fillets and transfer pan to a 200°C oven.\nStep 6: Bake for 6-8 minutes until salmon flakes easily.",
    ingredients: [
      { name: "Salmon fillets", quantity: "4 x 150g" },
      { name: "Honey", quantity: "3 tbsp" },
      { name: "Soy sauce", quantity: "2 tbsp" },
      { name: "Garlic cloves", quantity: "4, minced" },
      { name: "Lemon juice", quantity: "1 tbsp" },
      { name: "Chilli flakes", quantity: "¼ tsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    category: "Seafood",
    area: "American",
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    tags: ["salmon", "seafood", "quick", "healthy", "gluten-free"],
  },
  {
    title: "Prawn Pad Thai",
    description:
      "Classic Thai stir-fried rice noodles with juicy prawns, crunchy bean sprouts, and a punchy tamarind and fish sauce dressing.",
    instructions:
      "Step 1: Soak rice noodles in cold water for 30 minutes, then drain.\nStep 2: Mix tamarind paste, fish sauce, oyster sauce, and palm sugar.\nStep 3: Stir-fry prawns in a hot wok for 2 minutes. Remove and set aside.\nStep 4: Add shallots and garlic, scramble eggs in the gap.\nStep 5: Add noodles and sauce. Toss vigorously for 2 minutes.\nStep 6: Add prawns back, bean sprouts and spring onions. Serve with lime and peanuts.",
    ingredients: [
      { name: "Raw king prawns", quantity: "300g" },
      { name: "Rice noodles", quantity: "200g" },
      { name: "Eggs", quantity: "2 large" },
      { name: "Bean sprouts", quantity: "150g" },
      { name: "Tamarind paste", quantity: "3 tbsp" },
      { name: "Fish sauce", quantity: "2 tbsp" },
      { name: "Palm sugar", quantity: "1 tbsp" },
      { name: "Shallots", quantity: "2" },
      { name: "Crushed peanuts", quantity: "4 tbsp" },
      { name: "Lime", quantity: "1" },
    ],
    category: "Seafood",
    area: "Thai",
    imageUrl:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
    prepTime: 35,
    cookTime: 10,
    servings: 2,
    difficulty: "Hard",
    tags: ["thai", "noodles", "prawns", "stir fry", "asian"],
  },

  // ── PASTA ─────────────────────────────────────────────────────────────────
  {
    title: "Creamy Mushroom Risotto",
    description:
      "A silky, restaurant-quality mushroom risotto made with Arborio rice, white wine, Parmesan, and a mixture of wild and chestnut mushrooms.",
    instructions:
      "Step 1: Warm stock in a separate pan over low heat.\nStep 2: Fry sliced mushrooms in butter and oil over high heat until golden. Set aside.\nStep 3: Soften shallots and garlic in butter. Add Arborio rice and stir for 2 minutes.\nStep 4: Pour in white wine and stir until fully absorbed.\nStep 5: Add warm stock one ladleful at a time, stirring constantly for about 18 minutes.\nStep 6: Remove from heat. Stir in mushrooms, cold butter, and Parmesan. Rest 2 minutes and serve.",
    ingredients: [
      { name: "Arborio rice", quantity: "300g" },
      { name: "Mixed mushrooms", quantity: "400g" },
      { name: "Vegetable stock", quantity: "1.2 litres" },
      { name: "Dry white wine", quantity: "150ml" },
      { name: "Shallots", quantity: "3, diced" },
      { name: "Garlic cloves", quantity: "3, minced" },
      { name: "Parmesan", quantity: "80g, grated" },
      { name: "Unsalted butter", quantity: "60g" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Fresh thyme", quantity: "4 sprigs" },
    ],
    category: "Pasta",
    area: "Italian",
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    tags: ["italian", "vegetarian", "risotto", "mushrooms", "comfort food"],
  },
  {
    title: "Classic Margherita Pizza",
    description:
      "A simple yet elegant Neapolitan pizza with fresh mozzarella, San Marzano tomatoes, and fragrant basil on a perfectly thin, crispy base.",
    instructions:
      "Step 1: Mix flour, yeast, salt and olive oil with warm water and knead for 10 minutes. Rest for 1 hour.\nStep 2: Crush San Marzano tomatoes by hand, season with salt.\nStep 3: Stretch dough by hand into a thin round base.\nStep 4: Spread tomato sauce and top with torn mozzarella.\nStep 5: Bake at 250°C for 10-12 minutes until charred at the edges.\nStep 6: Scatter fresh basil and drizzle with olive oil.",
    ingredients: [
      { name: "00 flour", quantity: "300g" },
      { name: "Dried yeast", quantity: "7g" },
      { name: "San Marzano tomatoes", quantity: "400g tin" },
      { name: "Fresh mozzarella", quantity: "125g" },
      { name: "Fresh basil leaves", quantity: "handful" },
      { name: "Extra virgin olive oil", quantity: "2 tbsp" },
      { name: "Salt", quantity: "1 tsp" },
    ],
    category: "Pasta",
    area: "Italian",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    prepTime: 70,
    cookTime: 12,
    servings: 2,
    difficulty: "Medium",
    tags: ["italian", "pizza", "vegetarian", "baking"],
  },

  // ── VEGETARIAN ────────────────────────────────────────────────────────────
  {
    title: "Shakshuka",
    description:
      "Eggs poached directly in a spiced tomato and pepper sauce, served straight from the pan with crusty bread for dipping.",
    instructions:
      "Step 1: Heat olive oil in a wide pan. Fry sliced onion and peppers for 10 minutes.\nStep 2: Add minced garlic, cumin, paprika, coriander, and chilli flakes. Cook for 1 minute.\nStep 3: Pour in crushed tomatoes. Simmer for 15 minutes until sauce thickens.\nStep 4: Make four wells in the sauce. Crack an egg into each well.\nStep 5: Cover and cook for 5-7 minutes until whites are set but yolks are runny.\nStep 6: Scatter crumbled feta and fresh coriander. Serve with bread.",
    ingredients: [
      { name: "Eggs", quantity: "4 large" },
      { name: "Crushed tomatoes", quantity: "400g tin" },
      { name: "Red onion", quantity: "1" },
      { name: "Red pepper", quantity: "1" },
      { name: "Garlic cloves", quantity: "3, minced" },
      { name: "Ground cumin", quantity: "1 tsp" },
      { name: "Smoked paprika", quantity: "1 tsp" },
      { name: "Chilli flakes", quantity: "½ tsp" },
      { name: "Feta cheese", quantity: "60g" },
      { name: "Fresh coriander", quantity: "small bunch" },
      { name: "Olive oil", quantity: "2 tbsp" },
    ],
    category: "Vegetarian",
    area: "Middle Eastern",
    imageUrl:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800",
    prepTime: 5,
    cookTime: 30,
    servings: 2,
    difficulty: "Easy",
    tags: ["eggs", "vegetarian", "middle eastern", "one pan"],
  },

  // ── VEGAN ─────────────────────────────────────────────────────────────────
  {
    title: "Chickpea and Spinach Curry",
    description:
      "A hearty, warming vegan curry packed with protein-rich chickpeas and iron-rich spinach in a fragrant tomato and coconut sauce.",
    instructions:
      "Step 1: Heat oil in a large pan. Fry onion for 8 minutes until golden.\nStep 2: Add garlic, ginger, curry powder, cumin, and turmeric. Stir for 1 minute.\nStep 3: Pour in crushed tomatoes and coconut milk. Simmer for 10 minutes.\nStep 4: Add drained chickpeas and cook for another 10 minutes.\nStep 5: Stir in fresh spinach and cook until wilted.\nStep 6: Season with salt, lemon juice, and serve with rice or naan.",
    ingredients: [
      { name: "Chickpeas", quantity: "2 x 400g tins" },
      { name: "Fresh spinach", quantity: "200g" },
      { name: "Crushed tomatoes", quantity: "400g tin" },
      { name: "Coconut milk", quantity: "200ml" },
      { name: "Onion", quantity: "1 large" },
      { name: "Garlic cloves", quantity: "4, minced" },
      { name: "Fresh ginger", quantity: "2cm piece" },
      { name: "Curry powder", quantity: "2 tsp" },
      { name: "Ground cumin", quantity: "1 tsp" },
      { name: "Turmeric", quantity: "½ tsp" },
      { name: "Lemon juice", quantity: "1 tbsp" },
    ],
    category: "Vegan",
    area: "Indian",
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    tags: ["vegan", "curry", "chickpeas", "healthy", "indian"],
  },
  {
    title: "Buddha Bowl",
    description:
      "A nourishing vegan bowl packed with roasted sweet potato, quinoa, avocado, edamame, and a creamy tahini dressing.",
    instructions:
      "Step 1: Roast sweet potato cubes at 200°C with olive oil and smoked paprika for 25 minutes.\nStep 2: Cook quinoa according to packet instructions. Fluff with a fork.\nStep 3: Whisk tahini, lemon juice, garlic, and water to make the dressing.\nStep 4: Assemble bowls with quinoa as the base.\nStep 5: Top with sweet potato, avocado, edamame, cucumber, and cherry tomatoes.\nStep 6: Drizzle with tahini dressing and sprinkle with sesame seeds.",
    ingredients: [
      { name: "Sweet potato", quantity: "2 medium" },
      { name: "Quinoa", quantity: "150g" },
      { name: "Avocado", quantity: "1" },
      { name: "Edamame", quantity: "100g" },
      { name: "Cherry tomatoes", quantity: "100g" },
      { name: "Cucumber", quantity: "½" },
      { name: "Tahini", quantity: "3 tbsp" },
      { name: "Lemon juice", quantity: "2 tbsp" },
      { name: "Smoked paprika", quantity: "1 tsp" },
      { name: "Sesame seeds", quantity: "1 tbsp" },
    ],
    category: "Vegan",
    area: "Modern",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    tags: ["vegan", "healthy", "bowl", "quinoa", "meal prep"],
  },

  // ── BREAKFAST ─────────────────────────────────────────────────────────────
  {
    title: "Banana Pancakes",
    description:
      "Fluffy American-style pancakes with mashed ripe banana folded right into the batter, naturally sweet and incredibly soft.",
    instructions:
      "Step 1: Mash bananas thoroughly in a large bowl.\nStep 2: Whisk in eggs, milk, melted butter, vanilla extract, and a pinch of salt.\nStep 3: Sift flour, baking powder, and cinnamon over the wet ingredients. Fold gently.\nStep 4: Heat a non-stick pan over medium heat. Brush lightly with butter.\nStep 5: Pour about 60ml batter per pancake. Cook until bubbles appear, about 2 minutes.\nStep 6: Flip and cook 1 more minute. Serve with maple syrup and sliced banana.",
    ingredients: [
      { name: "Ripe bananas", quantity: "3 large" },
      { name: "Eggs", quantity: "2 large" },
      { name: "Milk", quantity: "200ml" },
      { name: "Plain flour", quantity: "180g" },
      { name: "Baking powder", quantity: "2 tsp" },
      { name: "Melted butter", quantity: "2 tbsp" },
      { name: "Vanilla extract", quantity: "1 tsp" },
      { name: "Ground cinnamon", quantity: "¼ tsp" },
      { name: "Maple syrup", quantity: "to serve" },
    ],
    category: "Breakfast",
    area: "American",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    tags: ["breakfast", "pancakes", "banana", "american", "sweet"],
  },
  {
    title: "Avocado Toast Deluxe",
    description:
      "Elevated avocado toast on thick sourdough with a perfectly poached egg, everything bagel seasoning, and chilli flakes. Ready in 10 minutes.",
    instructions:
      "Step 1: Toast sourdough slices until deep golden and crispy.\nStep 2: Mash avocado with lemon juice and salt.\nStep 3: Bring a pan of water to a gentle simmer. Add a splash of white wine vinegar.\nStep 4: Swirl the water and poach egg for exactly 3 minutes.\nStep 5: Spread mashed avocado onto toast. Place poached egg on top.\nStep 6: Season with everything bagel seasoning, chilli flakes, and a drizzle of olive oil.",
    ingredients: [
      { name: "Thick sourdough slices", quantity: "2" },
      { name: "Ripe avocados", quantity: "2" },
      { name: "Eggs", quantity: "2" },
      { name: "Lemon juice", quantity: "1 tbsp" },
      { name: "Everything bagel spice", quantity: "1 tsp" },
      { name: "Chilli flakes", quantity: "¼ tsp" },
      { name: "White wine vinegar", quantity: "1 tsp" },
      { name: "Olive oil", quantity: "drizzle" },
    ],
    category: "Breakfast",
    area: "Modern",
    imageUrl:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    difficulty: "Easy",
    tags: ["breakfast", "avocado", "eggs", "quick", "healthy"],
  },

  // ── DESSERT ───────────────────────────────────────────────────────────────
  {
    title: "Chocolate Lava Cake",
    description:
      "Individual molten chocolate cakes with a gooey, flowing center the ultimate indulgent dessert that takes just 25 minutes start to finish.",
    instructions:
      "Step 1: Preheat oven to 220°C. Butter four ramekins and dust with cocoa powder.\nStep 2: Melt dark chocolate and butter together in a heatproof bowl. Stir until smooth.\nStep 3: Whisk eggs, egg yolks and caster sugar until pale and slightly thickened.\nStep 4: Fold the chocolate mixture into the egg mixture, then sift in flour and fold gently.\nStep 5: Divide batter evenly between ramekins. Refrigerate at least 15 minutes.\nStep 6: Bake for exactly 12 minutes. Turn out immediately and serve with vanilla ice cream.",
    ingredients: [
      { name: "Dark chocolate (70%)", quantity: "200g" },
      { name: "Unsalted butter", quantity: "100g" },
      { name: "Eggs", quantity: "3 large" },
      { name: "Egg yolks", quantity: "3" },
      { name: "Caster sugar", quantity: "150g" },
      { name: "Plain flour", quantity: "50g" },
      { name: "Cocoa powder", quantity: "2 tbsp for dusting" },
    ],
    category: "Dessert",
    area: "French",
    imageUrl:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
    prepTime: 10,
    cookTime: 12,
    servings: 4,
    difficulty: "Medium",
    tags: ["chocolate", "dessert", "dinner party", "french", "baking"],
  },
  {
    title: "Puff Puff",
    description:
      "Light, airy West African deep-fried dough balls dusted in sugar a beloved street snack and party favourite across Nigeria and beyond.",
    instructions:
      "Step 1: Mix flour, yeast, sugar, salt, and nutmeg in a large bowl.\nStep 2: Add warm water gradually and mix until a smooth, thick batter forms.\nStep 3: Cover and leave to rise for 1 hour until doubled in size.\nStep 4: Heat vegetable oil in a deep pan to 180°C.\nStep 5: Scoop small balls of batter using a spoon and drop into the oil.\nStep 6: Fry in batches for 3-4 minutes, turning, until deep golden all over. Drain and dust with sugar.",
    ingredients: [
      { name: "Plain flour", quantity: "300g" },
      { name: "Instant yeast", quantity: "7g" },
      { name: "Caster sugar", quantity: "50g" },
      { name: "Salt", quantity: "½ tsp" },
      { name: "Nutmeg", quantity: "¼ tsp" },
      { name: "Warm water", quantity: "250ml" },
      { name: "Vegetable oil", quantity: "for frying" },
      { name: "Icing sugar", quantity: "to dust" },
    ],
    category: "Dessert",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    prepTime: 65,
    cookTime: 20,
    servings: 6,
    difficulty: "Easy",
    tags: ["nigerian", "dessert", "fried", "african", "street food", "sweet"],
  },

  // ── SOUP ──────────────────────────────────────────────────────────────────
  {
    title: "Egusi Soup",
    description:
      "A rich, hearty West African soup made with ground melon seeds, leafy greens, palm oil, and assorted meat. Best served with pounded yam.",
    instructions:
      "Step 1: Fry the egusi in palm oil for 5 minutes, stirring constantly, until it clumps together.\nStep 2: Add blended tomatoes, peppers, and crayfish. Fry for 10 minutes.\nStep 3: Add cooked assorted meat and stock. Simmer for 15 minutes.\nStep 4: Add stockfish and cook for another 10 minutes.\nStep 5: Stir in chopped spinach or bitterleaf. Cook for 3 more minutes.\nStep 6: Season with seasoning cubes and salt. Serve with pounded yam or eba.",
    ingredients: [
      { name: "Ground egusi", quantity: "250g" },
      { name: "Palm oil", quantity: "4 tbsp" },
      { name: "Assorted meat", quantity: "500g, cooked" },
      { name: "Stockfish", quantity: "200g" },
      { name: "Plum tomatoes", quantity: "3" },
      { name: "Red bell pepper", quantity: "1" },
      { name: "Scotch bonnet", quantity: "1" },
      { name: "Crayfish", quantity: "2 tbsp" },
      { name: "Fresh spinach", quantity: "150g" },
      { name: "Meat stock", quantity: "500ml" },
      { name: "Seasoning cubes", quantity: "2" },
    ],
    category: "Soup",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    difficulty: "Hard",
    tags: ["nigerian", "soup", "african", "traditional", "palm oil"],
  },
  {
    title: "Tomato Basil Soup",
    description:
      "A velvety, comforting roasted tomato and basil soup that is incredibly easy to make and tastes far better than anything from a tin.",
    instructions:
      "Step 1: Halve tomatoes and place cut-side up on a baking tray with garlic and onion. Drizzle with olive oil and roast at 200°C for 35 minutes.\nStep 2: Transfer roasted vegetables and all their juices to a large pot.\nStep 3: Add vegetable stock and bring to a simmer for 10 minutes.\nStep 4: Add fresh basil leaves.\nStep 5: Blend until completely smooth with a stick blender.\nStep 6: Stir in cream, season with salt and pepper, and serve with crusty bread.",
    ingredients: [
      { name: "Ripe tomatoes", quantity: "1kg" },
      { name: "Garlic cloves", quantity: "6, whole" },
      { name: "Onion", quantity: "1 large" },
      { name: "Vegetable stock", quantity: "500ml" },
      { name: "Fresh basil", quantity: "large bunch" },
      { name: "Double cream", quantity: "100ml" },
      { name: "Olive oil", quantity: "3 tbsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    category: "Soup",
    area: "Italian",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    prepTime: 10,
    cookTime: 45,
    servings: 4,
    difficulty: "Easy",
    tags: ["soup", "vegetarian", "tomato", "comfort food", "italian"],
  },

  // ── SIDE ──────────────────────────────────────────────────────────────────
  {
    title: "Garlic Roasted Potatoes",
    description:
      "Crispy on the outside, fluffy on the inside the ultimate roast potatoes with garlic, rosemary, and a generous coating of olive oil.",
    instructions:
      "Step 1: Peel and cut potatoes into large chunks. Parboil in salted water for 8 minutes.\nStep 2: Drain and shake the pot to rough up the edges of the potatoes.\nStep 3: Heat olive oil in a roasting tray in the oven at 220°C for 5 minutes.\nStep 4: Add potatoes to the hot oil carefully and coat well. Roast for 25 minutes.\nStep 5: Add crushed garlic cloves and rosemary sprigs. Turn potatoes and roast for another 20 minutes until deeply golden.\nStep 6: Season generously with salt and serve immediately.",
    ingredients: [
      { name: "Maris Piper potatoes", quantity: "1kg" },
      { name: "Olive oil", quantity: "4 tbsp" },
      { name: "Garlic cloves", quantity: "6, crushed" },
      { name: "Fresh rosemary", quantity: "3 sprigs" },
      { name: "Salt", quantity: "generous" },
    ],
    category: "Side",
    area: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1604634077299-fbc4ab5f6ba1?w=800",
    prepTime: 10,
    cookTime: 55,
    servings: 4,
    difficulty: "Easy",
    tags: ["side dish", "potatoes", "roasted", "vegetarian", "comfort food"],
  },
  {
    title: "Fried Plantain",
    description:
      "Sweet, caramelised fried plantain a staple side dish across West Africa and the Caribbean. Simple, quick, and utterly delicious.",
    instructions:
      "Step 1: Peel the plantains and cut into diagonal slices about 1cm thick.\nStep 2: Heat vegetable oil in a frying pan over medium heat enough to come halfway up the slices.\nStep 3: Fry plantain slices in batches for 2-3 minutes per side until deep golden and caramelised.\nStep 4: Remove with a slotted spoon and drain on kitchen paper.\nStep 5: Season lightly with a pinch of salt.\nStep 6: Serve immediately alongside jollof rice, beans, or any West African main.",
    ingredients: [
      { name: "Ripe plantains", quantity: "3 large" },
      { name: "Vegetable oil", quantity: "for shallow frying" },
      { name: "Salt", quantity: "pinch" },
    ],
    category: "Side",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=800",
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    tags: ["nigerian", "side dish", "plantain", "african", "quick", "vegan"],
  },

  // ── LUNCH ─────────────────────────────────────────────────────────────────
  {
    title: "Classic Caesar Salad",
    description:
      "A timeless lunch salad with crisp romaine lettuce, crunchy croutons, shaved Parmesan, and a rich, garlicky Caesar dressing.",
    instructions:
      "Step 1: Make croutons by tossing bread cubes in olive oil and garlic, then baking at 180°C for 15 minutes until golden.\nStep 2: Whisk together mayonnaise, lemon juice, Worcestershire sauce, Dijon mustard, minced garlic, and anchovy paste for the dressing.\nStep 3: Tear romaine lettuce into large pieces and place in a large bowl.\nStep 4: Pour dressing over lettuce and toss well to coat every leaf.\nStep 5: Add croutons and half the Parmesan. Toss again gently.\nStep 6: Plate and finish with the remaining Parmesan shavings and cracked black pepper.",
    ingredients: [
      { name: "Romaine lettuce", quantity: "2 heads" },
      { name: "Sourdough bread", quantity: "3 thick slices" },
      { name: "Parmesan", quantity: "80g, shaved" },
      { name: "Mayonnaise", quantity: "4 tbsp" },
      { name: "Lemon juice", quantity: "2 tbsp" },
      { name: "Worcestershire sauce", quantity: "1 tsp" },
      { name: "Dijon mustard", quantity: "1 tsp" },
      { name: "Garlic cloves", quantity: "2, minced" },
      { name: "Anchovy paste", quantity: "1 tsp" },
      { name: "Olive oil", quantity: "3 tbsp" },
      { name: "Black pepper", quantity: "to taste" },
    ],
    category: "Lunch",
    area: "American",
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    tags: ["salad", "lunch", "quick", "american", "classic"],
  },
  {
    title: "Chicken Club Sandwich",
    description:
      "A towering triple-decker club sandwich with grilled chicken, crispy bacon, avocado, tomato, and lettuce on toasted bread.",
    instructions:
      "Step 1: Season chicken breasts with salt, pepper, and paprika. Grill or pan-fry for 5-6 minutes each side until cooked through. Slice thinly.\nStep 2: Fry bacon rashers until crispy. Drain on kitchen paper.\nStep 3: Toast three slices of bread per sandwich.\nStep 4: Spread mayonnaise on each slice of toast.\nStep 5: Layer the first slice with chicken, lettuce, and tomato. Place the second slice on top.\nStep 6: Layer with bacon, avocado, and more lettuce. Top with the third slice. Secure with cocktail sticks and cut diagonally.",
    ingredients: [
      { name: "Chicken breasts", quantity: "2 large" },
      { name: "Bacon rashers", quantity: "6" },
      { name: "White sandwich bread", quantity: "6 slices" },
      { name: "Avocado", quantity: "1, sliced" },
      { name: "Tomato", quantity: "2, sliced" },
      { name: "Romaine lettuce", quantity: "4 leaves" },
      { name: "Mayonnaise", quantity: "3 tbsp" },
      { name: "Smoked paprika", quantity: "½ tsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    category: "Lunch",
    area: "American",
    imageUrl:
      "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=800",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["sandwich", "lunch", "chicken", "quick", "american"],
  },

  // ── DINNER ────────────────────────────────────────────────────────────────
  {
    title: "Lamb Chops with Mint Sauce",
    description:
      "Juicy, herb-crusted lamb chops seared to perfection and served with a vibrant fresh mint sauce an elegant dinner in under 30 minutes.",
    instructions:
      "Step 1: Make the mint sauce by combining finely chopped fresh mint with white wine vinegar, sugar, and a pinch of salt. Set aside.\nStep 2: Rub lamb chops all over with olive oil, crushed garlic, rosemary, salt, and pepper.\nStep 3: Heat a cast iron pan over very high heat until smoking.\nStep 4: Sear chops for 3 minutes per side for medium-rare, or 4 minutes for medium.\nStep 5: Rest the chops on a warm plate loosely covered with foil for 5 minutes.\nStep 6: Serve with mint sauce and roasted vegetables.",
    ingredients: [
      { name: "Lamb chops", quantity: "8" },
      { name: "Fresh mint", quantity: "large bunch" },
      { name: "White wine vinegar", quantity: "3 tbsp" },
      { name: "Caster sugar", quantity: "1 tsp" },
      { name: "Garlic cloves", quantity: "3, crushed" },
      { name: "Fresh rosemary", quantity: "2 sprigs" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    category: "Dinner",
    area: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    tags: ["lamb", "dinner", "elegant", "british", "quick"],
  },
  {
    title: "Baked Lemon Herb Chicken",
    description:
      "Succulent whole chicken thighs baked with lemon, garlic, and fresh herbs until golden and falling-off-the-bone tender. The perfect weeknight dinner.",
    instructions:
      "Step 1: Preheat oven to 200°C. Mix olive oil, lemon zest, lemon juice, minced garlic, thyme, rosemary, salt, and pepper in a bowl.\nStep 2: Score the chicken thighs with a knife and rub the herb mixture all over and under the skin.\nStep 3: Place in a roasting dish. Tuck lemon slices and garlic cloves around the chicken.\nStep 4: Roast for 40-45 minutes until skin is deep golden and juices run clear.\nStep 5: Baste with pan juices halfway through cooking.\nStep 6: Rest for 5 minutes before serving with the pan juices drizzled over.",
    ingredients: [
      { name: "Chicken thighs", quantity: "8, bone-in" },
      { name: "Lemon", quantity: "2" },
      { name: "Garlic cloves", quantity: "6" },
      { name: "Fresh thyme", quantity: "4 sprigs" },
      { name: "Fresh rosemary", quantity: "3 sprigs" },
      { name: "Olive oil", quantity: "3 tbsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    category: "Dinner",
    area: "Mediterranean",
    imageUrl:
      "https://images.unsplash.com/photo-1574672281194-db420378032d?w=800",
    prepTime: 15,
    cookTime: 45,
    servings: 4,
    difficulty: "Easy",
    tags: ["chicken", "dinner", "baked", "mediterranean", "healthy"],
  },

  // ── DRINKS ────────────────────────────────────────────────────────────────
  {
    title: "Zobo Hibiscus Drink",
    description:
      "A vibrant, tangy West African hibiscus drink made with dried zobo leaves, ginger, and pineapple. Served ice cold it is incredibly refreshing.",
    instructions:
      "Step 1: Rinse the dried hibiscus petals thoroughly under cold water.\nStep 2: Bring 2 litres of water to the boil in a large pot. Add hibiscus petals, sliced ginger, and cloves.\nStep 3: Reduce heat and simmer for 20 minutes until the liquid is deep red and fragrant.\nStep 4: Remove from heat and add pineapple chunks. Allow to steep for 30 minutes.\nStep 5: Strain through a fine sieve into a large jug, pressing to extract all the liquid.\nStep 6: Sweeten with sugar to taste, allow to cool completely, then refrigerate. Serve over ice with a slice of pineapple.",
    ingredients: [
      { name: "Dried hibiscus petals", quantity: "100g" },
      { name: "Fresh ginger", quantity: "5cm piece, sliced" },
      { name: "Pineapple", quantity: "½, chopped" },
      { name: "Cloves", quantity: "5 whole" },
      { name: "Sugar", quantity: "to taste" },
      { name: "Water", quantity: "2 litres" },
    ],
    category: "Drinks",
    area: "Nigerian",
    imageUrl:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
    prepTime: 10,
    cookTime: 20,
    servings: 8,
    difficulty: "Easy",
    tags: ["nigerian", "drinks", "hibiscus", "african", "non-alcoholic", "refreshing"],
  },
  {
    title: "Mango Ginger Smoothie",
    description:
      "A thick, tropical smoothie blended with ripe mango, fresh ginger, coconut milk, and a squeeze of lime. Ready in five minutes.",
    instructions:
      "Step 1: Peel and chop the mangoes. If using fresh mango, freeze the chunks for 1 hour for a thicker smoothie.\nStep 2: Peel and roughly chop the ginger.\nStep 3: Add mango, ginger, coconut milk, lime juice, and honey to a blender.\nStep 4: Blend on high speed for 60 seconds until completely smooth.\nStep 5: Taste and adjust sweetness with more honey if needed.\nStep 6: Pour into glasses over ice and garnish with a slice of lime.",
    ingredients: [
      { name: "Ripe mangoes", quantity: "2 large" },
      { name: "Fresh ginger", quantity: "2cm piece" },
      { name: "Coconut milk", quantity: "200ml" },
      { name: "Lime juice", quantity: "1 tbsp" },
      { name: "Honey", quantity: "1 tbsp" },
      { name: "Ice", quantity: "handful" },
    ],
    category: "Drinks",
    area: "Modern",
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    tags: ["smoothie", "drinks", "mango", "tropical", "vegan", "quick"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteOne({ email: "seed@nyama.com" });
    const seedUser = await User.create({
      username: "NyamaKitchen",
      email: "seed@nyama.com",
      password: "seedpassword123",
    });
    console.log(`Seed user created: ${seedUser.username}`);

    await Recipe.deleteMany({});
    console.log("Existing recipes cleared");

    const recipesWithAuthor = recipes.map((r) => ({
      ...r,
      author: seedUser._id,
    }));
    const inserted = await Recipe.insertMany(recipesWithAuthor);
    console.log(`${inserted.length} recipes inserted`);

    console.log("\nDone! Your database is populated.");
    console.log("Seed account: seed@nyama.com / seedpassword123");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
