const countryNames: any = {
  VN: 'Vietnam',
  US: 'United States',
  CA: 'Canada',
  PH: 'Philippines',
  // Add more country code mappings as needed
};

function getCountryNameFromCode(countryCode: string) {
  if (!countryCode || !countryNames.hasOwnProperty(countryCode)) {
    console.error('Invalid country code:', countryCode);
    return 'Unknown';
  }

  return countryNames[countryCode];
}

export default getCountryNameFromCode;
