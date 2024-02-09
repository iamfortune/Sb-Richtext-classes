import StoryblokClient from 'storyblok-js-client';

// Instantiate the Storyblok client with your account token
let Storyblok = new StoryblokClient({
  oauthToken: 'ACCESS_TOKEN'
});

const spaceId = SPACE_ID;

// Define custom classes to be applied to Richtext fields
const richTextClasses = {
  'Class 1': 'class-1',
  'Class 2': 'class-2',
  'Class 3': 'class-3'
};

// Applies custom classes to the settings of Richtext Fields in Storyblok components.
const applyRichTextClasses = async () => {
// Fetch all components in the specified space using the Storyblok Client
  const res = await Storyblok.get(`spaces/${spaceId}/components/`, {});
  res.data.components.forEach(async (component) => {
    let updates = false;
// Check if the field is a Richtext field
    Object.keys(component.schema).forEach((key) => {
      const field = component.schema[key];
      if(field.type === 'richtext') {
        // Apply custom classes to style_options
        field.style_options = Object.keys(richTextClasses).map(name => ({name, value: richTextClasses[name]}));
        updates = true;
      }
    });

// If updates are made, save the changes 
    if(updates) {
      try {
        await Storyblok.put(`spaces/${spaceId}/components/${component.id}`, { component });
        console.log(`Updated component: ${component.name}`);
      } catch(err) {
        console.log(`Error trying to update component ${component.name}: ${err}`);
      }
    }
  });
}

applyRichTextClasses();