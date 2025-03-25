import { FuneralHome } from '@/types/funeralHome';
import { mockFuneralHomes } from '@/data/mockFuneralHomes';

// Function to update an existing funeral home
export const updateFuneralHome = (id: string, updates: Partial<FuneralHome>): Promise<FuneralHome | null> => {
  return new Promise((resolve) => {
    // Find the index of the funeral home to update
    const index = mockFuneralHomes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      console.error("Funeral home not found with ID:", id);
      resolve(null);
      return;
    }
    
    console.log("Updating funeral home with ID:", id);
    console.log("Updates to be applied:", updates);
    
    // Critical fix: Ensure regions is properly handled during updates
    // We want to replace the regions array completely with what was passed
    const updatedHome = {
      ...mockFuneralHomes[index],
      ...updates,
      // Make sure regions is always an array
      regions: Array.isArray(updates.regions) ? [...updates.regions] : (mockFuneralHomes[index].regions || [])
    };
    
    // Replace the old funeral home with the updated one
    mockFuneralHomes[index] = updatedHome;
    
    console.log("Updated funeral home with regions:", updatedHome.regions);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(updatedHome);
    }, 500);
  });
};

// Function to delete a funeral home
export const deleteFuneralHome = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Find the index of the funeral home to delete
    const index = mockFuneralHomes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      resolve(false);
      return;
    }
    
    // Remove the funeral home from the array
    mockFuneralHomes.splice(index, 1);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Function to toggle featured status
export const toggleFeaturedStatus = (id: string): Promise<FuneralHome | null> => {
  return new Promise((resolve) => {
    // Find the index of the funeral home to update
    const index = mockFuneralHomes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      resolve(null);
      return;
    }
    
    // Toggle the featured status
    mockFuneralHomes[index].featured = !mockFuneralHomes[index].featured;
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(mockFuneralHomes[index]);
    }, 300);
  });
};

// Function to get featured funeral homes
export const getFeaturedFuneralHomes = (): Promise<FuneralHome[]> => {
  return new Promise((resolve) => {
    // Filter for featured funeral homes
    const featuredHomes = mockFuneralHomes.filter(home => home.featured);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(featuredHomes);
    }, 500);
  });
};
