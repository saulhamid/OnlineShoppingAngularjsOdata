using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using OnlineShopProject.Models;

namespace OnlineShopProject.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.OData.Builder;
    using System.Web.OData.Extensions;
    using OnlineShopProject.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<OrderDetail>("OrderDetails");
    builder.EntitySet<Customer>("Customers"); 
    builder.EntitySet<PaymantDetail>("PaymantDetails"); 
    builder.EntitySet<Product>("Products"); 
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class OrderDetailsController : ODataController
    {
        private OnlineShopProjectContext db = new OnlineShopProjectContext();

        // GET: odata/OrderDetails
        [EnableQuery]
        public IQueryable<OrderDetail> GetOrderDetails()
        {
            return db.OrderDetails;
        }

        // GET: odata/OrderDetails(5)
        [EnableQuery]
        public SingleResult<OrderDetail> GetOrderDetail([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderDetails.Where(orderDetail => orderDetail.OrderDetailsID == key));
        }

        // PUT: odata/OrderDetails(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<OrderDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderDetail orderDetail = await db.OrderDetails.FindAsync(key);
            if (orderDetail == null)
            {
                return NotFound();
            }

            patch.Put(orderDetail);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderDetail);
        }

        // POST: odata/OrderDetails
        public async Task<IHttpActionResult> Post(OrderDetail orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderDetails.Add(orderDetail);
            await db.SaveChangesAsync();

            return Created(orderDetail);
        }

        // PATCH: odata/OrderDetails(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<OrderDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderDetail orderDetail = await db.OrderDetails.FindAsync(key);
            if (orderDetail == null)
            {
                return NotFound();
            }

            patch.Patch(orderDetail);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(orderDetail);
        }

        // DELETE: odata/OrderDetails(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            OrderDetail orderDetail = await db.OrderDetails.FindAsync(key);
            if (orderDetail == null)
            {
                return NotFound();
            }

            db.OrderDetails.Remove(orderDetail);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/OrderDetails(5)/Customers
        [EnableQuery]
        public SingleResult<Customer> GetCustomers([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderDetails.Where(m => m.OrderDetailsID == key).Select(m => m.Customers));
        }

        // GET: odata/OrderDetails(5)/PaymantDetails
        [EnableQuery]
        public SingleResult<PaymantDetail> GetPaymantDetails([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderDetails.Where(m => m.OrderDetailsID == key).Select(m => m.PaymantDetails));
        }

        // GET: odata/OrderDetails(5)/Products
        [EnableQuery]
        public SingleResult<Product> GetProducts([FromODataUri] int key)
        {
            return SingleResult.Create(db.OrderDetails.Where(m => m.OrderDetailsID == key).Select(m => m.Products));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderDetailExists(int key)
        {
            return db.OrderDetails.Count(e => e.OrderDetailsID == key) > 0;
        }
    }
}
