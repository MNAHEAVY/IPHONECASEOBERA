const optimizeImage = (url, width = 800) => {
  if (!url || !url.includes("/upload/")) return url;

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

const optimizeProductImages = (product) => {
  if (!product) return product;

  return {
    ...product,

    images: product.images?.map((img) => optimizeImage(img, 800)) || [],

    imagenGeneral: product.imagenGeneral?.map((img) => optimizeImage(img, 800)) || [],

    color:
      product.color?.map((c) => ({
        ...c,
        imageColor: optimizeImage(c.imageColor, 200),
      })) || [],

    variants:
      product.variants?.map((v) => ({
        ...v,
        images: v.images?.map((img) => optimizeImage(img, 400)) || [],
      })) || [],
  };
};
export { optimizeImage, optimizeProductImages };
