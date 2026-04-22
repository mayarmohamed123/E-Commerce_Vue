/**
 * Type declarations for Vue files
 * Enables TypeScript to understand .vue imports
 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/**
 * Type declarations for SCSS modules
 */
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

/**
 * Type declarations for image assets
 */
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
