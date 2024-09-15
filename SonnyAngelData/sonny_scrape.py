import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

url = "https://www.sonnyangel.com/en/products/"

driver = webdriver.Chrome()
driver.get(url)


def product_details():
    products = driver.find_elements(By.CLASS_NAME, 'fg-item-inner')
    product_list = []
    for product in products:
        if product.is_displayed():
            product_name = product.find_element(By.TAG_NAME, 'img').get_attribute('title')
            product_image_url = product.find_element(By.TAG_NAME, 'img').get_attribute('src')
            product_list.append({
                "product_name": product_name,
                "product_image_url": product_image_url
            })
    return product_list


WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//ul[@class='menu']/li"))
)
all_collections = []

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//ul[@class='menu']/li"))
)

collections = driver.find_elements(By.XPATH, "//ul[@class='menu']/li")

for i in range(len(collections)):
    collection = driver.find_elements(By.XPATH, "//ul[@class='menu']/li")[i]
    collection_name = collection.text
    print(collection_name)

    collection.click()

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'responsive-tabs__list'))
    )

    series_tabs = driver.find_elements(By.XPATH, "//ul[@class='responsive-tabs__list']/li")
    series_list = []

    for j in range(len(series_tabs)):
        series_tab = series_tabs[j]
        series_name = series_tab.text
        print(series_name)

        series_tab.click()
    
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'fg-item-inner'))
        )
        products = product_details()
        series_list.append({
            "series_name": series_name,
            "products": products
        })

    all_collections.append({
        "collection_name": collection_name,
        "series": series_list
    })

with open('sonny_angel_data', 'w') as file:
    json.dump(all_collections, file, indent=4)

driver.quit()