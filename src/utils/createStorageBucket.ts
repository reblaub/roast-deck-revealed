
import { supabase } from '@/integrations/supabase/client';

export const createPitchdeckStorageBucket = async () => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === 'pitchdecks');
    
    if (!bucketExists) {
      // Create the bucket
      const { data, error } = await supabase.storage.createBucket('pitchdecks', {
        public: false, // Set to true if you want the files to be publicly accessible
      });
      
      if (error) {
        console.error('Error creating storage bucket:', error);
        return false;
      }

      // Using a different approach for policy creation instead of RPC
      console.log('Storage bucket created successfully');
      return true;
    }
    
    console.log('Storage bucket already exists');
    return true;
  } catch (error) {
    console.error('Error checking/creating storage bucket:', error);
    return false;
  }
};
