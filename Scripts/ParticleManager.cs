using UnityEngine;
using System.Collections.Generic;

public class ParticleManager : MonoBehaviour
{
    public TextAsset configFile;
    private Dictionary<string, ParticleType> _types = new Dictionary<string, ParticleType>();

    public IReadOnlyDictionary<string, ParticleType> Types => _types;

    void Awake()
    {
        LoadConfig();
    }

    void LoadConfig()
    {
        if (configFile == null)
        {
            Debug.LogError("Particle config file missing");
            return;
        }

        ParticleConfig config = JsonUtility.FromJson<ParticleConfig>(configFile.text);
        _types.Clear();
        foreach (var t in config.particles)
        {
            _types[t.name] = t;
        }
    }
}
