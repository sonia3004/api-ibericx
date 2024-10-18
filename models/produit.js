import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { mirage } from "ldrs";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Footer } from "./footer";
import { NavBar } from "./navBar";
import { ScrollToTop } from "./scroolToTop";

mirage.register();

export function ProductDetail() {
  const { addToCart } = useContext(CartContext); // Utilisation du contexte pour ajouter au panier
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // Stocker la taille sélectionnée
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`https://my-api-heroku-b0d23b24e1c6.herokuapp.com/produits/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <l-mirage className="" size="60" speed="2.5" color="black"></l-mirage>
      </div>
    );
  }

  if (error) {
    return <Navigate to="*" replace />;
  }

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleClick = () => {
    const requiresSize =
      product.category === "chaussures" || product.category === "vêtements";

    // Vérifie si la taille est requise pour les chaussures ou vêtements
    if (requiresSize && !selectedSize) {
      alert("Veuillez sélectionner une taille pour cet article.");
      return;
    }

    const productToAdd = {
      id: product._id,
      name: product.name,
      image: product.image, // Miniature du produit
      quantity,
      price: product.price,
      size: requiresSize ? selectedSize : null, // Ajoute la taille si elle est requise, sinon null
      color: selectedColor,
    };
    addToCart(productToAdd);
    console.log(productToAdd); // Ajoute le produit au panier
  };

  const isButtonDisabled =
    (product.category !== "accessoires" && (!selectedSize || !selectedColor)) ||
    !selectedColor;

  // Gestion du carrousel d'images
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  // Définir toutes les tailles possibles en fonction de la catégorie
  const allSizes =
    product.category === "chaussures"
      ? ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
      : product.category === "vêtements"
      ? ["S", "M", "L", "XL"]
      : [];

  return (
    <>
      <ScrollToTop />
      <NavBar />
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="flex flex-col items-start gap-8 sm:gap-20 lg:flex-row-reverse lg:items-start">
            {/* Affichage de l'image avec carrousel */}
            <div className="lg:w-2/3 order-first lg:order-last relative">
              <div className="relative h-[600px] w-full overflow-hidden">
                <img
                  src={product.image[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
                  onClick={prevImage}
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
                  onClick={nextImage}
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </button>
              </div>
            </div>

            <div className="lg:w-1/3">
              <p className="font-bold max-w-lg text-sm text-red-500 sm:text-base md:mb-10 lg:mb-2">
                {product.category.toUpperCase()}
              </p>
              <h1 className="text-xs mb-4 max-w-3xl font-bold md:text-5xl">
                {product.name}
              </h1>
              <p className="font-medium mb-3 max-w-lg text-sm text-gray-500 sm:text-l md:mb-10 lg:mb-8">
                Sold : {product.sold}
              </p>
              <p className="mb-6 w-full max-w-lg text-sm text-gray-500 sm:text-base md:mb-10 lg:mb-12">
                {product.description}
              </p>
              <p className="font-bold mb-6 max-w-lg text-2xl text-gray-500 sm:text-2xl md:mb-10 lg:mb-12">
                {product.price} €
              </p>

              {allSizes.length > 0 && (
                <SizeProducts
                  allSizes={allSizes} // Pass allSizes based on category
                  availableSizes={product.sizes} // Pass available sizes
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                />
              )}

              <ColorProducts
                colors={product.colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />

              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleClick}
                disabled={isButtonDisabled}
                className={`btn w-full ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-black"
                } px-6 py-3 font-semibold text-white`}
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function SizeProducts({ allSizes, availableSizes, setSelectedSize, selectedSize }) {
  return (
    <div className="mb-10">
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Available Sizes :
      </h3>
      <ul className="grid w-fit gap-2 grid-cols-5">
        {allSizes.map((size) => {
          const isAvailable = availableSizes.includes(size); // Vérifie si la taille est disponible
          return (
            <li key={size}>
              <input
                type="radio"
                id={`size-${size}`}
                name="size"
                value={size}
                className="hidden peer"
                onChange={() => setSelectedSize(size)}
                disabled={!isAvailable} // Désactive la taille si elle n'est pas disponible
              />
              <label
                htmlFor={`size-${size}`}
                className={`inline-flex items-center justify-between p-5 border border-gray-200 rounded-lg cursor-pointer ${
                  selectedSize === size ? "text-red-500" : "text-gray-900"
                } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`} // Change le style si indisponible
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">{size}</div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Fonction ColorProducts pour gérer les couleurs
function ColorProducts({ colors, selectedColor, setSelectedColor }) {
  if (!colors || colors.length === 0) {
    return <p>No colors available</p>;
  }

  return (
    <div className="mb-10">
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Choose a color :
      </h3>
      <ul className="flex space-x-4">
        {colors.map((color, index) => (
          <li key={index} className="relative">
            <input
              type="radio"
              id={`color-${color}`}
              name="color"
              value={color}
              className="hidden peer"
              onChange={() => setSelectedColor(color)}
            />
            <label
              htmlFor={`color-${color}`}
              className={`inline-flex items-center justify-between p-2 border rounded-full cursor-pointer
                ${
                  color === "white" ? "border-gray-300" : "border-transparent"
                } peer-checked:ring-2 peer-checked:ring-indigo-500`}
              style={{ backgroundColor: color }}
            >
              <div className="block w-8 h-8 rounded-full" />
              {selectedColor === color && (
                <CheckIcon
                  className="absolute inset-0 w-4 h-4 m-auto"
                  style={{ color: color === "white" ? "black" : "white" }}
                />
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
