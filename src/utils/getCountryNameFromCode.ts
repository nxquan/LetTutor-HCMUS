const getCountryNameFromCode = async (code: string) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await res.json();
  if (data) {
    return {
      name: data?.[0]?.name?.common,
      flag: data?.[0]?.flags?.png,
    };
  }
  return undefined;
};

export default getCountryNameFromCode;
