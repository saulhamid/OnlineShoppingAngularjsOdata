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
    builder.EntitySet<Supplaier>("Supplaiers");
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class SupplaiersController : ODataController
    {
        private OnlineShopProjectContext db = new OnlineShopProjectContext();

        // GET: odata/Supplaiers
        [EnableQuery]
        public IQueryable<Supplaier> GetSupplaiers()
        {
            return db.Supplaiers;
        }

        // GET: odata/Supplaiers(5)
        [EnableQuery]
        public SingleResult<Supplaier> GetSupplaier([FromODataUri] int key)
        {
            return SingleResult.Create(db.Supplaiers.Where(supplaier => supplaier.SupID == key));
        }

        // PUT: odata/Supplaiers(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<Supplaier> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplaier supplaier = await db.Supplaiers.FindAsync(key);
            if (supplaier == null)
            {
                return NotFound();
            }

            patch.Put(supplaier);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplaierExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(supplaier);
        }

        // POST: odata/Supplaiers
        public async Task<IHttpActionResult> Post(Supplaier supplaier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Supplaiers.Add(supplaier);
            await db.SaveChangesAsync();

            return Created(supplaier);
        }

        // PATCH: odata/Supplaiers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Supplaier> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplaier supplaier = await db.Supplaiers.FindAsync(key);
            if (supplaier == null)
            {
                return NotFound();
            }

            patch.Patch(supplaier);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplaierExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(supplaier);
        }

        // DELETE: odata/Supplaiers(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            Supplaier supplaier = await db.Supplaiers.FindAsync(key);
            if (supplaier == null)
            {
                return NotFound();
            }

            db.Supplaiers.Remove(supplaier);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplaierExists(int key)
        {
            return db.Supplaiers.Count(e => e.SupID == key) > 0;
        }
    }
}
