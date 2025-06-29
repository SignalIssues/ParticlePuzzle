using UnityEngine;

public class ParticleSpawner : MonoBehaviour
{
    public ParticleManager manager;
    public Camera mainCamera;
    public GameObject particlePrefab;

    private string currentType = "Water";

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            SpawnParticle();
        }
    }

    public void SetCurrentType(string type)
    {
        currentType = type;
    }

    void SpawnParticle()
    {
        if (manager == null || mainCamera == null || particlePrefab == null)
            return;

        if (!manager.Types.TryGetValue(currentType, out var type))
            return;

        Vector3 pos = mainCamera.ScreenToWorldPoint(Input.mousePosition);
        pos.z = 0f;
        var obj = Instantiate(particlePrefab, pos, Quaternion.identity);
        var particle = obj.GetComponent<Particle>();
        if (particle != null)
        {
            particle.Initialize(type);
        }
    }
}
