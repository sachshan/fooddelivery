# NUEats
## Description: 
In this project, we aim to implement a food delivery application. Customers can place food orders from a variety of restaurants via this application. Restaurants can post updates to their menu to provide customers with the best options. 
 
## Team Information

| Name | NEU ID          | Email Address                    |
| --------  | ----------------| ---------------------- |
| Linwei Shao | 001067027 | shao.li@northeastern.edu |
| Shantanu Sachdeva | 002748942 | sachdeva.sh@northeastern.edu |
| Sahithi Bommineni | 002768024 | bommineni.s@northeastern.edu |
| Shunchang Yu | 002957668 | yu.shun@northeastern.edu |

## Build

In the final-project-group-nueats parent directory, Run  
`npm run dev`  
`npm run sass`  

Run  
`cd Frontend/chat-app-frontend`   
`npm run build`  

## Run

In the final-project-group-nueats parent directory, Run  
`npm start`

# Instruction to run  
## Customer  
As a customer, click on either the `Order Now` button or the `Login` button on the upper right corner and it will direct you to the login page. Click on the `Free to register` it will direct you to the register page for customer. After registration, it will get you back to the login page.  
After logged in, you will see your user dashboard, containing your order history as well as the information update form. You will be able to track the order status and once it is delivered, you will be able to rate on the order. The rating will reflect immediately on the restaurant page as stars.  
Clicking on the `Restaurant` link in the nav bar, it will direct you to view all the restaurants. You can then use the search bar to search for the restaurant, the keyword can be in the restaurant name or tag or description, ignoring the case. After you click on the restaurant name, it will direct you to the restaurant detail page with all its menu items displaying.  
You can click the `Add to Cart` button to add the item to your cart. Then you can click on the shopping bag icon on the top right corner to get into your cart view. In your cart, you can click on the trash bin icon to delete the cart item and the `Place Order` button to place your order. Then you will be able to see the order displaying on your dashboard with a status of "Restaurant is Preparing".  
  
### NUChats
You can click on the `Chat` button and it will direct you to the chat page with the restaurant. An email will be automatically sent to the restaurant to notify the restaurant to join the chat room. After clicking on the link in the email, the restaurant will be able to join the chatroom and start chating with the customer. To send a message, type in the message in the text box, and click Send.  
To share location, click Share Location. If the browser asks allow your browser to share your location.  
  
  
## Restaurant  
As a restaurant, click on the `Join Merchant - Learn More` will get you to the restaurant registration page. After you registered, it will direct you to the login page.  
On your restaurant dashboard, you will be able to see all current order of your restaurant, and you can click on the checkmark to mark the order as done and it will change the order status to "Waiting for Courier". You can also add your menu item and they will be displayed on current menu. Clicking on the trash button next to the item will remove it from your menu. Similarly, you can update your information with the belowing form.  
  
## Courier 
As a courier, click on the `Join Courier - Learn More` will get you to the restaurant registration page. After you registered, it will direct you to the login page.  
After logged in, you will be able to see all orders that is not picked up by other couriers. Clicking on the car button, you will pick up the order and mark the order status as "On the Way", and the double-checkmark will update the order status as delivered. 


## Technology Stack

### Backend
- NodeJS
- ExpressJS
- MongoDB, Mongoose

### Frontend
- ReactJS
- EJS
- SCSS

