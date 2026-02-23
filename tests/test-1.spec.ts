import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.routeFromHAR('tests/api-snapshots/products.har', {
    url: /.*\/api/,      
    update: false,      
    updateContent: 'attach',
    notFound: 'fallback',
  });
  await page.goto('http://localhost:8888/');

  await expect(page.getByTestId('1')).toBeVisible();
  await expect(page).toHaveScreenshot('initial-load.png', {});

  await page.getByRole('combobox').selectOption('price');
  await expect(page.getByTestId('1')).toBeVisible();
  await expect(page).toHaveScreenshot('sortByPriceLow.png', {});

  await page.getByRole('combobox').selectOption('-price');
  await expect(page.getByTestId('1')).toBeVisible();
  await expect(page).toHaveScreenshot('sortByPriceHight.png', {});

  await page.getByRole('textbox', { name: 'Поиск' }).click();
  await page.getByRole('textbox', { name: 'Поиск' }).fill('air');
  await expect(page).toHaveScreenshot('searchByAir.png', {});
  
  await page.getByTestId('2').getByRole('img', { name: 'Favorite' }).click();
  await page.getByRole('link', { name: 'Favorite Закладки' }).click();
  await expect(page.getByTestId('2')).toBeVisible();
  await expect(page).toHaveScreenshot('favorite.png', {});
});