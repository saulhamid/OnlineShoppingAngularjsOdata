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
    builder.EntitySet<DelaveryService>("DelaveryServices");
    builder.EntitySet<OrderDetail>("OrderDetails"); 
    builder.EntitySet<Staff>("Staffs"); 
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class DelaveryServicesController : ODataController
    {
        private OnlineShopProjectContext db = new OnlineShopProjectContext();

        // GET: odata/DelaveryServices
        [EnableQuery]
        public IQueryable<DelaveryService> GetDelaveryServices()
        {
            return db.DelaveryServices;
        }

        // GET: odata/DelaveryServices(5)
        [EnableQuery]
        public SingleResult<DelaveryService> GetDelaveryService([FromODataUri] int key)
        {
            return SingleResult.Create(db.DelaveryServices.Where(delaveryService => delaveryService.DelaveryServiceID == key));
        }

        // PUT: odata/DelaveryServices(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<DelaveryService> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DelaveryService delaveryService = await db.DelaveryServices.FindAsync(key);
            if (delaveryService == null)
            {
                return NotFound();
            }

            patch.Put(delaveryService);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DelaveryServiceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(delaveryService);
        }

        // POST: odata/DelaveryServices
        public async Task<IHttpActionResult> Post(DelaveryService delaveryService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DelaveryServices.Add(delaveryService);
            await db.SaveChangesAsync();

            return Created(delaveryService);
        }

        // PATCH: odata/DelaveryServices(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<DelaveryService> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DelaveryService delaveryService = await db.DelaveryServices.FindAsync(key);
            if (delaveryService == null)
            {
                return NotFound();
            }

            patch.Patch(delaveryService);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DelaveryServiceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(delaveryService);
        }

        // DELETE: odata/DelaveryServices(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            DelaveryService delaveryService = await db.DelaveryServices.FindAsync(key);
            if (delaveryService == null)
            {
                return NotFound();
            }

            db.DelaveryServices.Remove(delaveryService);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/DelaveryServices(5)/OrderDetails
        [EnableQuery]
        public SingleResult<OrderDetail> GetOrderDetails([FromODataUri] int key)
        {
            return SingleResult.Create(db.DelaveryServices.Where(m => m.DelaveryServiceID == key).Select(m => m.OrderDetails));
        }

        // GET: odata/DelaveryServices(5)/Staffs
        [EnableQuery]
        public SingleResult<Staff> GetStaffs([FromODataUri] int key)
        {
            return SingleResult.Create(db.DelaveryServices.Where(m => m.DelaveryServiceID == key).Select(m => m.Staffs));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DelaveryServiceExists(int key)
        {
            return db.DelaveryServices.Count(e => e.DelaveryServiceID == key) > 0;
        }
    }
}
