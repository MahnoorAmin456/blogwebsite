import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '7zu375an', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name (e.g., 'production')
  apiVersion: '2021-03-25', // Use the current date or your API version
  useCdn: true, // Use CDN for fast access
});
