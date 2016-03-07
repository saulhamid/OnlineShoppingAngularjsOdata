using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using OnlineShopProject.Models;
   

namespace OnlineShopProject
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes


            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Customer>("Customers");
            builder.EntitySet<DelaveryService>("DelaveryServices");
            builder.EntitySet<OrderDetail>("OrderDetails");
            builder.EntitySet<PaymantDetail>("PaymantDetails");
            builder.EntitySet<ProductCategory>("ProductCategories");
            builder.EntitySet<Product>("Products");
            builder.EntitySet<Staff>("Staffs");
            builder.EntitySet<Supplaier>("Supplaiers");

            config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());



            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}
