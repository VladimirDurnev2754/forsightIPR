import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // await page.routeFromHAR('tests/api-snapshots/products.har', {
  //   url: /.*\/api/,      
  //   update: false,      
  //   updateContent: 'attach',
  //   matcher: 'relaxed',
  //   notFound: 'abort',
  // });
  
  await page.goto('http://localhost:8888/');

  await expect(page.getByText('Мужские Кроссовки Nike Blazer Mid Suede 1')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveScreenshot('initial-load.png', {});

  await page.getByRole('combobox').selectOption('price');
  await expect(page.getByTestId('1')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveScreenshot('sortByPriceLow.png', {});

  await page.getByRole('combobox').selectOption('-price');
  await expect(page.getByTestId('1')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveScreenshot('sortByPriceHight.png', {});

  await page.getByRole('textbox', { name: 'Поиск' }).click();
  await page.getByRole('textbox', { name: 'Поиск' }).fill('air');
  await expect(page).toHaveScreenshot('searchByAir.png', {});
  
  await page.getByTestId('2').getByRole('img', { name: 'Favorite' }).click();
  await page.getByRole('link', { name: 'Favorite Закладки' }).click();
  await expect(page.getByTestId('2')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveScreenshot('favorite.png', {});

  //  // 1. Прямой перехват ЛЮБОГО запроса к API
  // await page.route('**/api', async (route) => {
  //   await route.fulfill({
  //     status: 200,
  //     contentType: 'application/json',
  //     body: JSON.stringify({
  //       data: {
  //         products: [
  //           { 
  //             id: "1", 
  //             title: "Мужские Кроссовки Nike Blazer Mid Suede 1", 
  //             price: 12990, 
  //             imageUrl: "/img/1.jpg",
  //             isFavorite: false,
  //             isAdded: false 
  //           }
  //         ]
  //       }
  //     })
  //   });
  // });

  // // 2. Переходим на сайт (теперь он точно получит данные выше)
  // await page.goto('/');

  // // 3. Ждем появления товара (20с для медленного GitHub)
  // const product = page.getByText('Мужские Кроссовки Nike Blazer Mid Suede 1');
  // await expect(product).toBeVisible({ timeout: 20000 });
});