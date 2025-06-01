# Ionic Vue Routing Best Practices

## Problem: IonRouterOutlet Component Resolution Errors

When using Vue Router with Ionic Vue, nested routes without proper parent components can cause errors like:
```
TypeError: can't access property "default", matchedRouteRef2.value.components is undefined
```

## Solution Patterns

### ✅ GOOD: Flat Routes
Use flat route paths instead of nested children when there's no parent layout component:

```typescript
// ✅ GOOD - Flat routes
{
  path: '/auth/login',
  component: defineAsyncComponent(() => import('@/views/Auth/LoginPage.vue'))
},
{
  path: '/auth/register', 
  component: defineAsyncComponent(() => import('@/views/Auth/RegisterPage.vue'))
}
```

### ❌ BAD: Nested Routes Without Parent Component
Don't use nested children without a proper parent component containing `<ion-router-outlet>`:

```typescript
// ❌ BAD - Nested without parent component
{
  path: '/auth',
  children: [
    {
      path: 'login',
      component: defineAsyncComponent(() => import('@/views/Auth/LoginPage.vue'))
    }
  ]
}
```

### ✅ GOOD: Nested Routes With Proper Parent
Use nested routes only when you have a parent component with `<ion-router-outlet>`:

```typescript
// ✅ GOOD - Nested with TabsPage containing ion-router-outlet
{
  path: '/tabs',
  component: defineAsyncComponent(() => import('@/views/TabsPage.vue')),
  children: [
    {
      path: 'charge-events',
      component: defineAsyncComponent(() => import('@/views/ChargeEvents/ChargeEventsPage.vue'))
    }
  ]
}
```

## Component Import Pattern

Always use `defineAsyncComponent` for Ionic Vue route components:

```typescript
import { defineAsyncComponent } from 'vue';

// ✅ GOOD
component: defineAsyncComponent(() => import('@/views/SomePage.vue'))

// ❌ AVOID - Can cause resolution issues
component: () => import('@/views/SomePage.vue')
```

## Rule Summary

1. **Flat routes** for simple navigation paths
2. **Nested routes** only when parent has `<ion-router-outlet>`
3. **defineAsyncComponent** for all dynamic imports
4. Test routing incrementally starting with simple flat routes 